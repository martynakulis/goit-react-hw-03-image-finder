import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import './App.css';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: '',
    currentPage: 1,
    query: '',
    perPage: 12,
    isModalOpen: false,
    largeImg: '',
  };

  handleQuery = ({ inputValue }) => {
    this.setState({
      query: inputValue,
    });
  };

  getImages = async (query, page, imageValue) => {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '23624617-2acc542121790b9c586bd1c21',
          q: `${query}`,
          image_type: 'photo',
          orientation: 'horizontal',
          page: `${page}`,
          per_page: `${imageValue}`,
        },
      });

      const newImages = this.state.images.concat(response.data.hits);
      this.setState({
        images: newImages,
      });
      // this.setState({
      //   images: response.data.hits,
      // });
      console.log(response.data);
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  async componentDidMount() {
    const { query, currentPage, perPage } = this.state;
    await this.getImages(query, currentPage, perPage);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state.currentPage;
    if (
      nextState.currentPage === oldState.currentPage &&
      nextState.query === oldState.query
    ) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState) {
    const { query, currentPage, perPage } = this.state;
    if (prevState.query !== query) {
      this.setState({
        images: [],
        perPage: 12,
      });
    }

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.setState({ isLoading: true });
      try {
        await this.getImages(query, currentPage, perPage);
      } catch (error) {
        this.setState({
          error,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  handleImageClick = e => {
    this.setState({
      isModalOpen: true,
      largeImg: e.target.dataset.large,
    });
  };

  handleModalClose = e => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleKeyClose = e => {
    if (e.key === 'Escape') {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  render() {
    const { isLoading, images, isModalOpen, largeImg } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleQuery} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {images.length > 0 && !isLoading ? (
          <Button onClick={this.handleLoadMore} />
        ) : null}
        {isModalOpen && (
          <Modal
            src={largeImg}
            close={this.handleModalClose}
            keyClose={this.handleKeyClose}
          />
        )}
      </div>
    );
  }
}
export default App;
