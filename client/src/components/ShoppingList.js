import React, { Component } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal, ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  // Label,
  Input
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiPencil } from 'react-icons/bi';

// import UpdateModal from '../components/UpdateModal';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';

class ShoppingList extends Component {
  state = {
    modal: false,
    name: '',
    editItem: false,
  }

  constructor(props) {
    super(props);

    this.submitEdit = this.submitEdit.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
  }

  //Delete Item via delete action
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onChange = (e) => {
    this.setState({ name: e.target.value });
  }

  submitEdit(e) {
    e.preventDefault();

    const updatedItem = {
      name: this.state.name
    }
    
    //Update item via updateItem action
    this.props.updateItem(this.state.editItem._id, updatedItem); 

    //Close Modal
    this.toggle();
    // setTimeout(() => {this.props.getItems()}, 50); //WHHHYY?!?!?!?!?!?!
  }

  setEditItem(x) {
    this.setState({
      editItem: x,
      modal: true
    });
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {/* {items.map(({ _id, name }) => ( */}
            {items.map((x) => (
              <CSSTransition key={x._id} timeout={500} classNames="fade">
                <ListGroupItem className="d-flex justify-content-between">
                  {x.name}
                  <div className="d-flex align-items-center">
                    <Button
                      className="edit-btn"
                      id={x._id}
                      size="sm"
                      color="dark"
                      onClick={(e) => {
                        this.setEditItem(x);
                      }}
                    >
                      <BiPencil />
                    </Button>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, x._id)}
                    >
                      &times;
                    </Button>
                  </div>
                </ListGroupItem>
              </CSSTransition>
            ))}
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              // edititem={items.filter((i) => { return i._id === this.state.toggle; })[0]}
            >
              <ModalHeader toggle={this.toggle}>
                Edit Item
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.submitEdit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="item"
                      placeholder={this.state.editItem && this.state.editItem.name}
                      onChange={this.onChange}
                    />
                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      blocks
                    >
                      Update Item
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired, //Bringing in an action from redux will be stored as a prop
  deleteItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired, //Bringing in an action from redux will be stored as a prop
  item: PropTypes.object.isRequired,
  editItem: PropTypes.object
}

const mapStatetoProps = (state) => ({
  item: state.item
});

export default connect(
  mapStatetoProps,
  { getItems, deleteItem, updateItem })
  (ShoppingList);