import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

class AppIntroModal extends Component {
    //What to do when the submit button is clicked
    handleSubmit = () => {
        this.props.dispatch({type: 'UPDATE_USER'});
        //Close modal after user clicks on create tree
        this.props.onHide();
    }

    render() {
        return (
          <Modal
              show={this.props.show}
              onHide={this.props.onHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
            <Modal.Body>
              <Card className="bg-dark text-white">
                <Card.Img src="./images/tree.jpg" alt="Explanation of the Human Behavior Matrix" />
                <Card.ImgOverlay> 
                <Card.Title className="text-center">
                  <div><Image src="./images/Maximum_1_Logo_Yellow.png" thumbnail/> </div>
                  <div>The Human Behavior (HB-X™)</div>
                </Card.Title>
                  <div className="hero-text-div">
                    <div className="hero-text">
                      <pre>
                      “When I was in my 20s, I got understanding of human behavior. I used a “tree” to describe the basic
                      connection between trauma events (roots), resulting core beliefs (trunk), thoughts and attitudes
                      (branches), and finally behavior (fruit).
                      I didn’t yet know there was much more detail, but it was a starting framework. From these ideas, I
                      started my personal journey to wholeness and THE HB-X™ emotional health protocol featured in the
                      Maximum 1™ Life App. It saved me from discouragement, being consumed by hate and rage, suicide,
                      and addiction, bad habits, and also depression.”
                      –Marius J. Massie, Creator, THE HB-X™<br />
                      Much of the way we move in the world is built on emotional learning that was formed when we were
                      quite young. Some emotional learning produces healthy fruit (self-esteem, connectedness, healthy
                      boundaries, etc.) and some produce unhealthy fruit (low self-worth, ambivalence, unsafe behaviors).
                      Most often, this emotional learning either helps us thrive or survive in our families of origin depending
                      on what the atmosphere was like. As we mature, those ways of being follow us and can either continue
                      to help us thrive or continue to keep us in survival mode (fight, flight, freeze, or submit) even when we
                      no longer need to be.
                      The good news is that this can change with some intention and willingness to do some deeper work. THE
                      HB-X™ is just the instrument to help. This step-by-step protocol will help you work your way to the root
                      of the problem and then change it with new evidence that is based on truth.
                      </pre>
                      <Button variant="primary" type="submit" onClick={this.handleSubmit} block="true">
                        Got it
                      </Button>
                    </div>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Modal.Body>
          </Modal>
        );
    }
}

export default connect()(AppIntroModal);