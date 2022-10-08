import React from "react";
import {Bank, PiggyBank, Coin} from 'react-bootstrap-icons'


const StakeTab = props => {
    <div className='marketContainer'>
          <div className='subContainer'>
            <span>
              <img className='logoImg' src='eth-logo.webp'/>
            </span>
            <span className='marketHeader'>Ethereum Market</span>
          </div>

          <div className='row'>
            
           
            <div className='col-md-4'>
              <div onClick={() => this.openStakingModel(30, '7%')} className='marketOption'>
                <div className='glyphContainer hoverButton'>
                  <span className='glyph'>
                    <Coin />
                  </span>
                </div>
                <div>
                  <span className='optionData'>1 Month</span>
                  <span className='optionPercent'>7%</span>
                </div>
              </div>
            </div>
            
            
            <div className='col-md-4'>
              <div onClick={() => this.openStakingModel(90, '10%')} className='marketOption'>
                <div className='glyphContainer hoverButton'>
                  <span className='glyph'>
                    <Coin />
                  </span>
                </div>
                <div>
                  <span className='optionData'>3 Months</span>
                  <span className='optionPercent'>10%</span>
                </div>
              </div>
            </div>
            
            
            <div className='col-md-4'>
              <div onClick={() => this.openStakingModel(180, '12%')} className='marketOption'>
                <div className='glyphContainer hoverButton'>
                  <span className='glyph'>
                    <Coin />
                  </span>
                </div>
                <div>
                  <span className='optionData'>6 Months</span>
                  <span className='optionPercent'>12%</span>
                </div>
              </div>
            </div>
          
          
          </div>
        </div>
}

export default StakeTab;