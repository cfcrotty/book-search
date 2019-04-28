import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form"; //, TextArea

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2%'
  }
};

Modal.setAppElement('#root');

class Books extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      books: [],
      search: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // state = {
  //   books: [],
  //   search: ""
  // };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.loadBooks({ "saved": false });
  }

  loadBooks = (data) => {
    API.getBooks(data)
      .then(res => {
        //console.log(res.data)
        this.setState({ books: res.data, search: "" })
      }
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks({ "saved": false }))
      .catch(err => console.log(err));
  };

  updateBook = (id, data) => {
    API.updateBook(id, data)
      .then(res => this.loadBooks({ "saved": false }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.saveBook({
        search: this.state.search
      })
        .then(res => {
          this.loadBooks({ "saved": false });
          //alert("Search Done!");
          this.openModal();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Search and Save Books of Interest</h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <div className="card margin1">
              <div className="card-header">
                <form>
                  <Input
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    name="search"
                    placeholder="Search (required)"
                  />
                  <FormBtn
                    className="btn btn-success"
                    disabled={!(this.state.search)}
                    onClick={this.handleFormSubmit}
                  >
                    Search
              </FormBtn>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <div className="card" style={{ marginBottom: "50px" }}>
              <div className="card-header"><h3>Results</h3></div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-9">
                              <Link to={"/books/" + book._id}>{book.title}</Link>
                              <p className="col-md-12">by {book.authors.join()}</p>
                            </div>
                            <div className="col-md-1">
                              <a href={book.link} target="_blank" rel="noopener noreferrer">
                                <FormBtn className="btn btn-primary">
                                  View
                              </FormBtn>
                              </a>
                            </div>
                            <div className="col-md-1">
                              <FormBtn onClick={() => this.updateBook(book._id, { "saved": true })} className="btn btn-success">
                                Save
                              </FormBtn>
                            </div>
                            <div className="col-md-1">
                              <FormBtn onClick={() => this.deleteBook(book._id)} className="btn btn-danger">
                                Delete
                              </FormBtn>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <img src={book.image} alt={book.name} ></img>
                            </div>
                            <div className="col-md-10">
                              {book.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="row">
            <div className="col-md-12">
              <span style={{ "float": "right", "cursor": "pointer" }} onClick={this.closeModal}>x</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 ref={subtitle => this.subtitle = subtitle}>Search Done!</h3>
              <div>Please check the results.</div>
            </div>
          </div>
          <div className="row" style={{ "margin": "auto" }}>
            <div className="col-md-12" style={{ "margin": "auto" }} >
              <button style={{ "marginTop": "20px", "marginLeft": "25%" }} className="btn btn-secondary" onClick={this.closeModal}>close</button>
            </div>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default Books;
