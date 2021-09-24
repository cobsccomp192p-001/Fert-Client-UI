const moreDetails = (props) => {
  console.log(props.location.state.WNO);

  return <><h2>Example</h2><h1>{props.location.state.WNO}</h1></>;
};
export default moreDetails;
