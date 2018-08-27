module.exports = function(e, form) {
  if (form === 'logout') {
    // console.log("handleSideBarClickMock called with form", form);

    this.setState({ auth: false, userFormDisplay: '' });
  } else {
    this.setState({
      userFormDisplay: form
    });
  }
};
