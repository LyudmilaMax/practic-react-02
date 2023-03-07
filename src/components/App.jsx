import { Component } from 'react';
import Button from './Button/Button';
import { fetchTrendingMoviesPerDay } from '../services/moviesApi';
import MoviesGallery from './MoviesGallery/MoviesList';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    isListShown: false,
    movies: [],
    page: 1,
    isLoading: false,
    currentAvatar: null,
  };

  showList = () => {
    this.setState(prevState => {
      return { isListShown: !prevState.isListShown };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isListShown } = this.state;

    if (
      (prevState.isListShown !== isListShown && isListShown) ||
      (prevState.page !== this.state.page && isListShown)
    ) {
      this.getMovies();
    }

    if (prevState.isListShown !== isListShown && !isListShown) {
      this.setState({ movies: [], page: 1 });
    }
  }

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchTrendingMoviesPerDay(this.state.page)
      .then(data => {
        this.setState(prevState => {
          return { movies: [...prevState.movies, ...data] };
        });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteMovies = id => {
    this.setState(prevState => ({
      movies: prevState.movies.filter(movie => movie.id !== id),
    }));
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ currentAvatar: image });
  };

  closeModal =() => {
    this.setState({currentAvatar: null})
  }
  render() {
    return (
      <div>
    {this.state.currentAvatar && (<Modal currentAvatar={this.state.currentAvatar} closeModal={this.closeModal} />)}
        <Button
          clickHandler={this.showList}
          text={this.state.isListShown ? 'Hide movies list' : 'Show movies list'}
        />

        {this.state.movies.length > 0 && (
          <>
            <MoviesGallery
              movies={this.state.movies}
              delete={this.deleteMovies}
              openModal={this.openModal}
            />{' '}
            <Button text="Load more" clickHandler={this.loadMore} />
          </>
        )}

        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}
