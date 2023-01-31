import React from "react"

const customers =  [
    {
        "id": 1,
        "issue": "Tire not good",
        "custid": 1233459332,
        "severity": "HIGH",
        "amount": 250,
        "issuestatus": "Initiated",
        "confirmationno": "",
        "selected": false
    },
    {
        "id": 2,
        "issue": "Break not good",
        "custid": 1233459332,
        "severity": "HIGH",
        "amount": 250,
        "issuestatus": "Paid",
        "confirmationno": null,
        "selected": false
    },
    {
        "id": 3,
        "issue": "Break not good",
        "custid": 1233459332,
        "severity": "HIGH",
        "amount": 250,
        "issuestatus": "Initiated",
        "confirmationno": "",
        "selected": false
    },
    {
        "id": 4,
        "issue": "Break not good",
        "custid": 1233459333,
        "severity": "HIGH",
        "amount": 250,
        "issuestatus": "Initiated",
        "confirmationno": "",
        "selected": false
    }
]

class SelectTableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      List: customers,
      MasterChecked: false,
      SelectedList: [],
    }
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List
    // Check/ UnCheck All Items
    tempList.map((customer) => (customer.selected = e.target.checked))

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    })
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List
    tempList.map((customer) => {
      if (customer.id === item.id) {
        customer.selected = e.target.checked
      }
      return customer
    })

    //To Control Master Checkbox State
    const totalItems = this.state.List.length
    const totalCheckedItems = tempList.filter((e) => e.selected).length

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    })
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th scope="col">ID</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Severity</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.List.map((customer) => (
                  <tr key={customer.id} className={customer.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={customer.selected}
                        className="form-check-input"
                        id="rowcheck{customer.id}"
                        onChange={(e) => this.onItemCheck(e, customer)}
                      />
                    </th>
                    <td>{customer.id}</td>
                    <td>{customer.issue}</td>
                    <td>{customer.severity}</td>
                    <td>{customer.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              Get Selected Items {this.state.SelectedList.length} 
            </button>
            <div className="row">
              <b>All Row Items:</b>
              <code>{JSON.stringify(this.state.List)}</code>
            </div>
            <div className="row">
              <b>Selected Row Items(Click Button To Get):</b>
              <code>{JSON.stringify(this.state.SelectedList)}</code>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectTableComponent