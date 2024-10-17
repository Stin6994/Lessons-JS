import { connect } from 'react-redux'
import * as actions from '../action';


const Counter = ({ counter, something, inc, dec, rnd }) => {
  return (
    <div className="jumbotron">
      <h1>{counter}   {something}</h1>
      <button onClick={dec} className="btn btn-primary">DEC</button>
      <button onClick={inc} className="btn btn-primary">INC</button>
      <button onClick={rnd} className="btn btn-primary">RND</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    counter: state.value,
    something: state.foo
  }
}

/* const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
} */

export default connect(mapStateToProps, actions)(Counter);