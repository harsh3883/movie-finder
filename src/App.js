import React, { useState } from 'react';
import Axios from 'axios';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { styled } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import MovieComponents from './components/MovieComponents';
import MovieInfoComponent from './components/MovieInfoComponent';

export const API_KEY = 'aea6ed73';

const Header1 = styled.div`
  background-color: #830088;
  width: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 4px 0 #555;
  padding-right: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 1px;
  width: 50%;
  background-color: white;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  background-color: white;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
`;
const Placeholderimage = styled.img`
  width: 300px;
  height: 200px;
  margin-top: 150px;
  opacity: 80%;
`;
function App() {
  const [searchQuery, updateSearchQuery] = useState('');

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async searchString => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = e => {
    onMovieSelect('');
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Header1>
          <AppName>
            <MovieImage src="favicon-32x32.png" />
            MovieFinder
          </AppName>

          <SearchBox>
            <AiOutlineSearch z={1} color="black" />
            <SearchInput
              placeholder="Search Movie"
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
        </Header1>
        <ColorModeSwitcher justifySelf="flex-end" />
        {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie}
            onMovieSelect={onMovieSelect}
          />
        )}
        <MovieListContainer>
          {movieList?.length ? (
            movieList.map((movie, index) => (
              <MovieComponents
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <Placeholder>
              <Placeholderimage src="download.png" />
              Search movie here...
            </Placeholder>
          )}
        </MovieListContainer>
      </Container>
    </ChakraProvider>
  );
}

export default App;
