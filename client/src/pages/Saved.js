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
    this.loadBooks({ "saved": true });
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

  updateBook = (id, data) => {
    API.updateBook(id, data)
      .then(res => this.loadBooks({ "saved": true }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Saved Books</h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <div className="card" style={{ marginBottom: "50px" }}>
              <div className="card-header"><h3>Saved</h3></div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-10">
                              <Link to={"/books/" + book._id}>{book.title}</Link>
                              <p className="col-md-12">by {book.authors}</p>
                            </div>
                            <div className="col-md-1">
                              <a href={book.link} target="_blank" rel="noopener noreferrer">
                                <FormBtn className="btn btn-primary">
                                  View
                              </FormBtn>
                              </a>

                            </div>
                            <div className="col-md-1">
                              <FormBtn onClick={() => this.updateBook(book._id, { "saved": false })} className="btn btn-danger">
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
      </Container>
    );
  }
}

export default Books;
