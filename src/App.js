import React from "react";
import "./App.css";

var userArray = ["Anit Kumar Singh","Amit Kumar Singh","Priyesh Kumar","Sunita Kumar","Golden Nesbitt","Chanell Hetzler","Vickey Consolini ","Myrna Delagarza"];

class App extends React.Component {
  state = {
    items: [],
    value: "",
  };

  handleKeyDownChange = evnt => {
    if (["Enter", "Tab"].includes(evnt.key)) {
      evnt.preventDefault();
      let value = this.state.value.trim();
      if (value ) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: (evt.target.value).charAt(0).toUpperCase() + (evt.target.value).slice(1)
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  autoComplete = (inpt, arr) =>{
    console.log(arr);
    var currentFocus;
    inpt.addEventListener("input", function(e) {
        var a, b,  val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<img src='/Images/19514760.png' width='30px' height='30px' style='border-radius:100%;justify-content:center;align-items:center;margin-right:10px'>" + "<strong style='justify-content:center;align-items:center'>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inpt.value = this.getElementsByTagName("input")[0].value;
                  console.log(inpt.value);
                  var index = arr.indexOf(inpt.value);
                  arr.splice(index,1)
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
   
    inpt.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode === 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode === 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inpt) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        // console.log(e.target.value);
    });
  }
  
  render() {
    return (
      <>
        {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            <img src="/Images/19514760.png" width="22px" height="22px" alt="users" 
                 style={{borderRadius:'100%',marginLeft:'-10px',marginRight:'10px'}}/>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}
        <form autoComplete="off">
          <div className="autocomplete">
            <input
              className="input"
              id="myInput"
              value={this.state.value}
              placeholder="Type users and press `Enter`..."
              onKeyDown={this.handleKeyDownChange}
              onChange={this.handleChange}
              onClick={()=>this.autoComplete(document.getElementById("myInput"), userArray)}
            />
          </div>
        </form>
      </>
    );
  }
}

export default App;