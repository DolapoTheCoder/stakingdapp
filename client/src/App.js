import './App.css';
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import artifact from './artifacts/contracts/Staking.sol/Staking.json';
import NavBar from './components/NavBar';
import {Bank, PiggyBank, Coin} from 'react-bootstrap-icons'

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  //general
  const  [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [contract, setContract] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)
  
  //assets
  const [assetIds, setAssetIds] = useState([])
  const [assets, setAssets] = useState([])
  
  //staking
  const [showStakeModal, setShowStakeModal] = useState(false)
  const [stakingLength, setStakingLength] = useState(undefined)
  const [stakingPercent, setStakingPercent] = useState(undefined)
  const [amount, setAmount] = useState(0)
 

  //helper
  const toString = bytes32 => ethers.utils.parseBytes32String(bytes32)
  const toWei = ether => ethers.utils.parseEther(ether)
  const toEther = wei => ethers.utils.formatEther(wei)


  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const contract = await new ethers.Contract(
        CONTRACT_ADDRESS, 
        artifact.abi
        )
        setContract(contract)
    }
    onLoad()
  }, [])

  ///check if wallet is conneced
  const isConnected = () => signer !== undefined

  const getSigner = async () => {
    provider.send("eth_requestAaccounts", [])
    const signer = provider.getSigner()
    setSigner(signer)
    return signer
  }

  const getAssetsIds = async (address, signer) => {
    const assetIds = await contract.connect(signer).getPositionIdsForAddress(address)
    return assetIds
  }

  const calcDaysRemaining = async (unlockedDate) => {
    const timeNow = Date.now() / 1000
    const secondsRemaining = unlockedDate - timeNow
    return Math.max( (secondsRemaining / 60 /60 / 24).toFixed(0),0 )
  }

  const getAssets = async (ids, signer) => {
    const querriedAssets = await Promise.all(
      ids.map(id => contract.connect(signer).getPositionById(id))
    )

    querriedAssets.map(async asset => {
      const parsedAsset = {
        positionId: asset.positionId,
        percentInterest: Number(asset.percentInterest) / 100,
        daysRemaining: calcDaysRemaining(Number(asset.unlockedDate)),
        etherInterest: toEther(asset.weiInterest),
        etherStaked: toEther(asset.weiStaked),
        open: asset.open,
      }

      setAssets(prev => [...prev, parsedAsset])
    })
  }

  const connectAndLoad = async () => {
    const signer = await getSigner(provider)
    setSigner(signer)

    const signerAddress = await signer.getAddress()
    setSignerAddress(signerAddress)

    const assetId = await getAssetsIds(signerAddress, signer)

    setAssetIds(assetIds)

    getAssets(assetIds, signer)
  }

  const openStakingModel = (stakingLength, stakingPercent) => {
    setShowStakeModal(true)
    setStakingLength(stakingLength)
    setStakingPercent(stakingPercent)
  }

  const stakeEther = () => {
    const wei = toWei(amount)
    const data = { value: wei }
    contract.connect(signer).stakeEther(stakingLength, data)
  }

  const withdraw = positionId => {
    contract.connect(signer).closePosition(positionId)
  }

  return (
    <div className="App">
      <div>
        <NavBar
          isConnected={isConnected}
          connect={connectAndLoad}
        />
      </div>

      <div className='appBody'>
        <div className='marketContainer'>
          <div className='subContainer'>
            <span>
              <img className='logoImg' src='eth-logo.webp'/>
            </span>
            <span className='marketHeader'>Ethereum Market</span>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div onClick={() => openStakingModel(30, '7%')} className='marketOption'>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
