import * as React from 'react'
import Layout from '../components/Layout'
import {Alert, Button, Card, Col, Container, Form} from 'react-bootstrap';
import {API_URL} from "../utils/api";
import {SyntheticEvent, useState} from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Link from "next/link";

type RequirementTest = {
  arguments: string,
  body: string
}

type requirement = {
  validMsg: string,
  invalidMsg: string,
  met: boolean,
  testFunc: RequirementTest
}

type InputField = {
  name: string,
  displayName: string,
  type: string,
  value: string,
  isValid: boolean,
  validationRegex: string,
  requirements: Record<string, requirement>,
  refField?: string,
  maxLength?: number,
  minLength?: number
}

function register(event: SyntheticEvent, fields: Record<string, InputField>, setErrors: Function, setPostRegister: Function) {
  event.preventDefault();
  // @ts-ignore
  const {email, username, password, terms} = fields;

  const formData = new URLSearchParams();
  formData.append('email', email.value);
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('terms', terms.value);

  fetch(`${API_URL}/v1/auth/register`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    body: formData
  }).then((response) => {
    if (response.status == 200) {
      setErrors([]);
      setPostRegister(true);
      return;
    }
    response.json().then(data => {
      setErrors(data["message"]);
    })
  });

}

function allValid(fields: Record<string, InputField>) {
  let valid = true;
  for (let index in fields) {
    if (!fields[index].isValid) {
      valid = false;
    }
  }
  return valid;
}


function handleChange(event: React.ChangeEvent<HTMLInputElement>, field: InputField, fields: Record<string, InputField>, forceUpdate: Function) {
  for (let x in field.requirements) {
    field.requirements[x].met = false;
  }
  let val = event.target.value;
  if (event.target.type === "checkbox") {
    val = String(event.target.checked);
  }
  field.value = val;
  let valid = new RegExp(field.validationRegex).test(field.value);
  if (field.refField) {
    valid = valid && fields[field.refField].value === field.value;
    field.requirements["reference"].met = valid;
  }

  let allMet = true;
  for (let index in field.requirements) {
    if (field.requirements[index].testFunc) {
      let testFunc = new Function(field.requirements[index].testFunc.arguments, field.requirements[index].testFunc.body);
      field.requirements[index].met = testFunc(field, fields);
      if (!field.requirements[index].met) {
        allMet = false;
      }
    }
  }

  field.isValid = valid && allMet;
  forceUpdate({});

}


function getPopover(title: string, content: JSX.Element[]) {
  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>
        {content.map(val => {
          return val;
        })}
      </Popover.Content>
    </Popover>
  );
}

function fillRequirements(field: InputField): JSX.Element[] {
  let arr: JSX.Element[] = [];

  for (let x in field.requirements) {
    let req: requirement = field.requirements[x];
    if (req.met) {
      arr.push(<p className={"text-success mb-0"}>{req.validMsg}</p>);
    } else {
      arr.push(<p className={"text-danger mb-0"}>{req.invalidMsg}</p>);
    }
  }

  return arr;
}


function renderPostRegister() {
  return (
    <Layout title="Register | Diluv">
      <div className="container">
        <div className="pb-md-2 pt-md-3 text-center">
          <h1>Register</h1>
        </div>
        <Container>
          <Row className={"justify-content-md-center"}>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Email Verification</Card.Title>
                  <Card.Text>
                    You should have received an email with a verification link.
                  </Card.Text>
                  <Card.Text>
                    if you don't see it, check your spam folder
                  </Card.Text>
                  <Card.Text>
                    {/*TODO send request for email*/}
                    <Button block>Send Again</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

// @ts-ignore
function RegisterPage({fields}) {
  const [, forceUpdate] = useState({});
  const [errors, setErrors] = useState([]);
  const [postRegister, setPostRegister] = useState(false);


  if (postRegister) {
    return renderPostRegister();
  }
  return (<Layout title="Register | Diluv">
      <div className="container">
        <div className="pb-md-2 pt-md-3 text-center">
          <h1>Register</h1>
        </div>
        <Container>
          {errors.length != 0 &&
          <Row className={"justify-content-md-center"}>
            <Col md={8}>
              <Alert variant={"danger"}>
                {errors}
              </Alert>
            </Col>
          </Row>
          }
          <Form onSubmit={(e: SyntheticEvent) => register(e, fields, setErrors, setPostRegister)}>
            <Form.Row className={"justify-content-md-center"}>
              <Col md={4}>
                <Form.Group controlId="usernameId">
                  <Form.Label>Username</Form.Label>
                  <OverlayTrigger trigger="focus" placement="top-start"
                                  overlay={getPopover(fields["username"]["displayName"], fillRequirements(fields["username"]))}>
                    <Form.Control
                      type={fields["username"]["type"]}
                      name={fields["username"]["name"]}
                      defaultValue={fields["username"]["value"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, fields["username"], fields, forceUpdate)}
                      isValid={fields["username"]["isValid"]}
                      minLength={fields["username"]["minLength"]}
                      maxLength={fields["username"]["maxLength"]}
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="emailId">
                  <Form.Label>Email</Form.Label>
                  <OverlayTrigger trigger="focus" placement="top-start"
                                  overlay={getPopover(fields["email"]["displayName"], fillRequirements(fields["email"]))}>
                    <Form.Control
                      type={fields["email"]["type"]}
                      name={fields["email"]["type"]}
                      defaultValue={fields["email"]["value"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, fields["email"], fields, forceUpdate)}
                      isValid={fields["email"]["isValid"]}
                      data-tip="hello world"
                      data-event='click focus'
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className={"justify-content-md-center"}>
              <Col md={4}>
                <Form.Group controlId="passwordId">
                  <Form.Label>Password</Form.Label>
                  <OverlayTrigger trigger="focus" placement="top-start"
                                  overlay={getPopover(fields["password"]["displayName"], fillRequirements(fields["password"]))}>
                    <Form.Control
                      type={fields["password"]["type"]}
                      name={fields["password"]["name"]}
                      defaultValue={fields["password"]["value"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, fields["password"], fields, forceUpdate)}
                      isValid={fields["password"]["isValid"]}
                      minLength={fields["password"]["minLength"]}
                      maxLength={fields["password"]["maxLength"]}
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="passwordConfirmId">
                  <Form.Label>Password Confirmation</Form.Label>
                  <OverlayTrigger trigger="focus" placement="top-start"
                                  overlay={getPopover(fields["passwordConfirm"]["displayName"], fillRequirements(fields["passwordConfirm"]))}>
                    <Form.Control
                      type={fields["passwordConfirm"]["type"]}
                      name={fields["passwordConfirm"]["type"]}
                      defaultValue={fields["passwordConfirm"]["value"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, fields["passwordConfirm"], fields, forceUpdate)}
                      isValid={fields["passwordConfirm"]["isValid"]}
                      minLength={fields["passwordConfirm"]["minLength"]}
                      maxLength={fields["passwordConfirm"]["maxLength"]}
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className={"justify-content-md-center"}>
              <Col md={4} className={"text-center"}>
                <Form.Check
                  required
                  name={fields["terms"]["name"]}
                  label="Agree to terms and conditions"
                  defaultChecked={fields["terms"]["value"] === "true"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, fields["terms"], fields, forceUpdate)}
                  id="terms"
                >
                </Form.Check>
              </Col>
            </Form.Row>
            <Form.Row className={"justify-content-md-center pt-2"}>
              <Col md={4}>
                <Button type="submit" disabled={!allValid(fields)} block>Register</Button>
              </Col>
            </Form.Row>
          </Form>
          <Row className={"justify-content-md-center pt-2"}>
            <Col md={4}>
              <p className={"text-center"}>Already have an account? <Link href={"/login"}>Login!</Link></p>
            </Col>
          </Row>
        </Container>

      </div>
    </Layout>
  );
}

RegisterPage.getInitialProps = async ({}) => {
  const fields: Record<string, InputField> = {
    "email": {
      name: "email",
      displayName: "Email",
      type: "email",
      value: "",
      isValid: false,
      validationRegex: `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`,
      requirements: {
        "valid": {
          invalidMsg: "Valid Email Address: ❌",
          validMsg: "Valid Email Address: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: `return new RegExp(field.validationRegex).test(field.value);`
          }
        }
      }
    },
    "username": {
      name: "username",
      displayName: "Username",
      type: "string",
      value: "",
      isValid: false,
      validationRegex: `^.{3,49}$`,
      requirements: {
        "minLength": {
          invalidMsg: "At least 3 characters: ❌",
          validMsg: "At least 3 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 3;"
          }
        },
        "maxLength": {
          invalidMsg: "Less than 50 characters: ❌",
          validMsg: "Less than 50 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length <= 50;"
          }
        }


      },
      minLength: 3,
      maxLength: 49
    },
    "password": {
      name: "password",
      displayName: "Password",
      type: "password",
      value: "",
      isValid: false,
      validationRegex: `^.{8,}`,
      requirements: {
        "minLength": {
          invalidMsg: "At least 8 characters: ❌",
          validMsg: "At least 8 characters: ✔",
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 8;"
          },
          met: false
        },
        "maxLength": {
          invalidMsg: "Less than 70 characters: ❌",
          validMsg: "Less than 70 characters: ✔",
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length < 70;"
          },
          met: false
        }
      },
      minLength: 8,
      maxLength: 70
    },
    "passwordConfirm": {
      name: "passwordConfirm",
      displayName: "Confirm Password",
      type: "password",
      value: "",
      isValid: false,
      validationRegex: `^.{8,}`,
      refField: "password",
      requirements: {
        "minLength": {
          invalidMsg: "At least 8 characters: ❌",
          validMsg: "At least 8 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 8;"
          }
        },
        "maxLength": {
          invalidMsg: "Less than 70 characters: ❌",
          validMsg: "Less than 70 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length < 70;"
          }
        },
        "reference": {
          invalidMsg: "Passwords match: ❌",
          validMsg: "Passwords match: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return fields[field.refField].value===field.value;"
          }
        }
      },
      minLength: 8,
      maxLength: 69
    },
    "terms": {
      name: "terms",
      displayName: "Terms",
      type: "checkbox",
      value: "false",
      isValid: false,
      validationRegex: `true`,
      requirements: {}

    }
  };
  return {fields: fields};
};

export default RegisterPage
