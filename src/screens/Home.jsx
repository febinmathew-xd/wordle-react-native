import {SafeAreaView, StatusBar, StyleSheet, Vibration} from 'react-native';

import {
  Board,
  Header,
  Keyboard,
  LoadingIndicator,
  Error,
  Message,
  RevailAnswer,
} from '../components';

import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {wordList} from '../utils/wordList';
import ProfileModal from '../components/ProfileModal';
import Axios from '../utils/api';
import {AuthContext} from '../routes/Routes';
import {getData, storeData} from '../utils/storage';
import {ThemeContext} from '../App';
import {praises} from '../utils/utls';

export const AppContext = createContext();

const Home = ({navigation}) => {
  const [profileVisible, setProfileVisible] = useState(false);

  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letter: 0});
  const [disabledKey, setDisabledKey] = useState([]);
  const [greenKey, setGreenKey] = useState([]);
  const [yellowKey, setYellowKey] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameover: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wordSet, setWordSet] = useState(new Set(wordList));
  const [profileView, setProfileView] = useState(true);
  const [settingsView, setSettingsView] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [profile, setProfile] = useState({});
  const [messageVisible, setMessageVisible] = useState(false);
  const [praise, setPraise] = useState({isPraise: false, message: ''});

  const {theme} = useContext(ThemeContext);
  const {userData, avatar, setAvatar} = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setError(false);

    //api call to get profile details

    Axios.get(`profile/?userId=${userData?.id}`)
      .then(response => {
        if (response) {
          setProfile(response.data);
          fetchAnswer();
        }
      })
      .catch(error => {
        setError(true);
        if (error?.response?.data?.error) {
          console.log(error.response.data.error);
        }
      })
      .finally(() => setLoading(false));

    //api call to get correct answer

    //load game data stored in asyncStorage
    const loadGameData = async correctWord => {
      console.log('correct word line107', correctWord);
      try {
        const answer = await getData('correctWord');
        console.log('answer loadgame data ', answer);

        if (answer === correctWord || answer === null) {
          try {
            const gameData = await getData('gameData');
            console.log('gamedata load game data', gameData);
            setBoard(gameData.board);
            setCurrentAttempt(gameData.currentAttempt);
            setGameOver(gameData.gameOver);

            if (answer === null) {
              storeData('correctWord', correctWord)
                .then(() => {})
                .catch(() => {});
            }
          } catch (error) {
            console.log(error);
            setError(true);
          }
        } else {
          storeData('correctWord', correctWord)
            .then(() => {
              console.log('correct word stored');
            })
            .catch(error => console.log(error));
          storeData('gameData', {
            board: board,
            currentAttempt: currentAttempt,
            gameOver: gameOver,
          })
            .then(() => {
              console.log(
                'default game data saved when correct answer changed',
              );
            })
            .catch(error => {
              console.log(error);
              setError(true);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAnswer = async () => {
      try {
        const response = await Axios.get('get/answer/');
        if (response) {
          setCorrectWord(wordList[response.data.correct_answer]);
          console.log('is there', response.data);
          console.log(correctWord);
          loadGameData(wordList[response?.data?.correct_answer]);
        }
      } catch (error) {
        console.log('answer fetching axios error', error);
        setError(true);
      }
    };
  }, [refresh]);

  const onSelectLetter = useCallback(
    keyVal => {
      if (currentAttempt.letter > 4) return;
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letter] = keyVal;
      setBoard(newBoard);
      setCurrentAttempt({
        attempt: currentAttempt.attempt,
        letter: currentAttempt.letter + 1,
      });
    },
    [currentAttempt, board],
  );

  const onDelete = useCallback(() => {
    if (currentAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letter - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({
      attempt: currentAttempt.attempt,
      letter: currentAttempt.letter - 1,
    });
  }, [currentAttempt, board]);

  const onEnter = useCallback(() => {
    if (currentAttempt.letter !== 5) return;
    let currentWord = '';
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      if (currentAttempt.attempt === 0) {
        //api call for profile update -- increment total games by 1
        Axios.patch('profile/', {
          id: userData?.id,
          data: {total: profile?.total + 1},
        })
          .then(response => {
            console.log(
              'total update patch operation response data',
              response?.data,
            );
            setProfile(response?.data);
          })
          .catch(error => {
            console.log(
              'axios error while updating patch operation of total',
              error,
            );
          });
      }

      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letter: 0});
      storeData('gameData', {
        board: board,
        currentAttempt: {attempt: currentAttempt.attempt + 1, letter: 0},
        gameOver: gameOver,
      })
        .then(() => {
          console.log('gameData updated for correct word in word list');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // not word in the list: inform user
      setMessageVisible(true);
      Vibration.vibrate(150);
      setTimeout(() => {
        setMessageVisible(false);
      }, 1000);
    }
    //if choosen correct word..gaveover
    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({gameover: true, guessedWord: true});
      //show praise after animation ends
      const msg = praises[Math.floor(Math.random() * praises.length)];

      setTimeout(() => {
        setPraise({isPraise: true, message: msg});
        Vibration.vibrate(350);
        setTimeout(() => {
          setPraise({isPraise: false, message: ''});
        }, 5000);
      }, 1600);

      storeData('gameData', {
        board: board,
        currentAttempt: {attempt: currentAttempt.attempt + 1, letter: 0},
        gameOver: {gameover: true, guessedWord: true},
      })
        .then(() => {
          console.log('gameData updated for game over for correct guess');
        })
        .catch(error => {
          console.log(error);
        });
      //api call to increment win count also update winstreak and update max winstreak if needed
      //update win distribution according to attempt value

      //api call to increment win count and update guess distribution

      const updateWonAndGuess = (id, data) => {
        Axios.patch('profile/', {id: id, data: data})
          .then(response => {
            console.log(
              'won and guess distribution update respose',
              response?.data,
            );
            setProfile(response.data);
          })
          .catch(error =>
            console.log('error updating won and guess distribution', error),
          );
      };

      const id = userData?.id;
      const newWonNumber = profile?.won + 1;

      if (currentAttempt.attempt === 0) {
        const data = {
          won: newWonNumber,
          guess_distribution_1: profile.guess_distribution_1 + 1,
        };
        updateWonAndGuess(id, data);
      } else if (currentAttempt.attempt == 1) {
        const data = {
          won: newWonNumber,
          guess_distribution_2: profile.guess_distribution_2 + 1,
        };
        updateWonAndGuess(id, data);
      } else if (currentAttempt.attempt == 2) {
        const data = {
          won: newWonNumber,
          guess_distribution_3: profile.guess_distribution_3 + 1,
        };
        updateWonAndGuess(id, data);
      } else if (currentAttempt.attempt == 3) {
        const data = {
          won: newWonNumber,
          guess_distribution_4: profile.guess_distribution_4 + 1,
        };
        updateWonAndGuess(id, data);
      } else if (currentAttempt.attempt == 4) {
        const data = {
          won: newWonNumber,
          guess_distribution_5: profile.guess_distribution_5 + 1,
        };
        updateWonAndGuess(id, data);
      } else if (currentAttempt.attempt == 5) {
        const data = {
          won: newWonNumber,
          guess_distribution_6: profile.guess_distribution_6 + 1,
        };
        updateWonAndGuess(id, data);
      }
    }
    //gameover: not guessed correct
    if (currentAttempt.attempt + 1 === 6) {
      setGameOver({gameover: true, guessedWord: false});

      //vibration for correct answer revail
      setTimeout(() => {
        Vibration.vibrate(300);
      }, 4600);

      storeData('gameData', {
        board: board,
        currentAttempt: {attempt: currentAttempt.attempt + 1, letter: 0},
        gameOver: {gameover: true, guessedWord: false},
      })
        .then(() => {
          console.log('gameData updated for game fail');
        })
        .catch(error => {
          console.log(error);
        });
      //api call to update gameover status
    }
  }, [board, currentAttempt, correctWord, wordSet]);

  const handleProfle = useCallback(() => {
    setProfileView(true);
    setSettingsView(false);
  }, []);

  const handleSettings = useCallback(() => {
    setSettingsView(true);
    setProfileView(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefresh(prev => prev + 1);
  }, []);

  const values = useMemo(
    () => ({
      onDelete,
      onEnter,
      onSelectLetter,
      board,
      currentAttempt,
      disabledKey,
      yellowKey,
      greenKey,
      setYellowKey,
      setGreenKey,
      setDisabledKey,
      correctWord,
      gameOver,
      avatar,
      setAvatar,
      profileView,
      settingsView,
      profile,
    }),
    [
      onDelete,
      setAvatar,
      onEnter,
      onSelectLetter,
      currentAttempt,
      disabledKey,
      yellowKey,
      greenKey,
      setGreenKey,
      setYellowKey,
      setDisabledKey,
      correctWord,
      gameOver,
      avatar,
      board,
      profileView,
      settingsView,
      profile,
    ],
  );

  return (
    <AppContext.Provider value={values}>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Error handlePress={handleRefresh} theme={theme} />
      ) : (
        <>
          <StatusBar backgroundColor={theme.primary} />
          <SafeAreaView
            style={[styles.container, {backgroundColor: theme.background}]}>
            <Header
              onStatPress={handleProfle}
              onIconPress={handleSettings}
              setStatVisible={setProfileVisible}
            />
            <Board />
            <Keyboard />

            <ProfileModal
              visible={profileVisible}
              setVisible={setProfileVisible}
              handleProfle={handleProfle}
              handleSettings={handleSettings}
            />

            {messageVisible && <Message message={'word not in list'} />}
            {praise.isPraise && <Message message={praise.message} />}
          </SafeAreaView>
        </>
      )}
    </AppContext.Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
