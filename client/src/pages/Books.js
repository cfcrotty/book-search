import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form"; //, TextArea

class Books extends Component {
  state = {
    books: [],
    search: ""
  };

  componentDidMount() {
    this.loadBooks({"saved":false});
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
      .then(res => this.loadBooks({"saved":false}))
      .catch(err => console.log(err));
  };

  updateBook = (id,data) => {
    API.updateBook(id,data)
      .then(res => this.loadBooks({"saved":false}))
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
        .then(res => this.loadBooks({"saved":false}))
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
              <h3>Search and Save of Interrest</h3>
            </Jumbotron>
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
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <div className="card">
              <div className="card-header">Results</div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-10">
                              <Link to={"/books/" + book._id}>{book.title}</Link>
                            </div>
                            <div className="col-md-1">
                            <a href={book.link} target="_blank" rel="noopener noreferrer">
                            <FormBtn className="btn btn-primary">
                                View
                              </FormBtn>
                              </a>
                              
                            </div>
                            <div className="col-md-1">
                            <FormBtn onClick={() => this.updateBook(book._id,{"saved":true})} className="btn btn-success">
                                Save
                              </FormBtn>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">by {book.authors}</div></div>
                          <div className="row">
                            <div className="col-md-2">
                              <img src={book.image}alt={book.name} ></img>
                            </div>
                            <div className="col-md-10">
                              {book.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
