import React, { Component } from 'react'


export default class GeneralHeader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  render() {
    // console.log(this.props)
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light justify-content-between bg-header">
              <div className="navbar-brand">
              </div>

              <div className='d-flex'>

                {
                    (
                    <div>
                        <a className="nav-link" href={this.props.to} style={{color:'inherit'}}>
                          <div className='d-flex flex-column'>                      
                            <div style={{fontSize:'10px'}}>Manage</div>
                          </div>
                        </a>                 
                    </div>
                  )
                }
            
                <div>
                    <a className="nav-link" href={this.props.to} style={{color:'inherit'}}>
                      <div className='d-flex flex-column'>
                        <img src={Home} height={25} width={25} className='align-self-center'/>                      
                        <div style={{fontSize:'10px'}}>Return to Home</div>
                      </div>
                    </a>                 
                </div>

              </div>
          </nav>

      </div>
    )
  }
}
