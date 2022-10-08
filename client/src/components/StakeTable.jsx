import React from "react";

const StakeTable = props => {
    <div className='assetContainer'>
        <div className='subContainer'>
          <span className='marketHeader'>Staked Assets</span>
        </div>
        <div>
          <div className='row columnHeaders'>
            <div className='col-md-2'>Assets</div>
            <div className='col-md-2'>Percent Interest</div>
            <div className='col-md-2'>Staked</div>
            <div className='col-md-2'>Interest</div>
            <div className='col-md-2'>Days Remaining</div>
            <div className='col-md-2'></div>
          </div>
        </div>
        <br/>
        {this.assets.length > 0 && this.assets.map((a, idx) => (
          <div className='row'>
            <div className='col-md-2'>
              <span>
                <img className='stakedLogoImg' src='eth-logo.webp'/>
              </span>
            </div>
            <div className='col-md-2'>
              {a.percentInterest} % 
            </div>
          </div>
        ))}
    </div>
}

export default StakeTable;