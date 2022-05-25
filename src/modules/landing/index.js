import React, { Component } from 'react'
import Footer from 'modules/generic/frames/footer.js'
import { Container, Box, Grid } from '@mui/material';
import Button from 'modules/generic/button'
import bgAgent from 'assets/lighterGray.png'
import bgHelpa from 'assets/lighterPink.png'
import './Style.css'
import API from 'services/api'
import Routes from 'common/Routes'


export class Landing extends Component {
  constructor(props) {
    super(props)
    this.state={
      theme: '',
      data: null,
      features: [],
      others: [],
      hasFetched: false
    }
  }
  componentDidMount() {
    const {history} = this.props
    this.retrieve()
    if(history.location.pathname.includes('agent')) {
      console.log('agent')
      this.setState({theme: 'agent'})
    }else{
      console.log('helpa')
      this.setState({theme: 'helpa'})
    }
  }
  retrieve(){
    const {theme} = this.state
    let status = theme
    let param = {
      condition:[
        {
          column: 'payload',
          clause: '=',
          value: status
          // value: 'agent'
        }
      ]
    }
    API.request(Routes.payloadsRetrieve, param, response => {
      if(response.data.length > 0){
        this.setState({
          ...this.state,
          data: response.data,
          hasFetched: true
        })
      console.log('here', status)

      }
    })
  }
  // modify based on theme with database values
  componentWillUnmount(){
    this._isFetching = false;
  }
  renderVideo(){
    const {data} = this.state;
    return(
      <div>
        <Grid style={{
          backgroundColor: '#E5E5E5',
          backgroundImage: `url(${bgAgent})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%'
        }} container alignItems={'center'} justifyContent={'center'} >
            <Grid item xs={6} style={{
              padding: '5%',
              textAlign: 'left'
            }}>
                <h1 className='h1-lg' style={{
                  fontSize: '80px',
                  fontWeight: 'bold',
                  color: '#34475D',
                }}>What do you need a Helpa for?</h1>
                <h3 style={{
                  color: '#34475DA3'
                }}>Do you need help with your property opens this weekend? Need more manpower to complete your inspection reports? Let KeyHelpa find the freelance help you need.</h3>
            </Grid>
            <Grid item style={{
              display: 'flex',
              flexWrap: 'wrap',
            }} xs={6} textAlign={'right'} padding={'5%'} direction={'row'}>
              {
                data.map((item, index) => {
                if(item.payload_value.helps != undefined){
                  return(
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'right',
                    flexBasis: '100%',
                  }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'right',
                      flexDirection: 'column',
                      marginRight: '25px'
                    }}>
                      <h3 style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: '#34475D'
                      }} >{item.payload_value.helps.title}</h3>
                      {(item.payload_value.helps.description).map((val, ctr)=>{
                        return(<p key={ctr}>{val}</p>)
                      })}
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center', 
                      flexDirection: 'row'
                    }}>
                      <div style={{
                          marginTop: '25px',
                        }}>
                          <iframe  width="400" height="300" src={`${item.payload_value.helps.url}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </Box> 
                  </div>
                  )
                }
              })
              }
             
            </Grid>
        </Grid>
     </div>
      );
  }
  renderFeatures(){
    const {theme, data, features} =  this.state;
    {
      data.map((item, index) => {
        if(item.payload_value.features != null || item.payload_value.features != undefined){
          features.push(item.payload_value.features)
        }
      })
    }
    if(features.length > 0){
    return(
      <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
      }} container alignItems={'center'} justifyContent={'center'}>
        {
          features.map((item, index) => {
            console.log('features', item);
            if(index != 3){
              // circle with arrows
              if(index % 2 === 0){
                return(
                  // pointing up
                    <Grid item xs={3} style={{
                      padding: '5% 0% 5% 5%',
                      textAlign: 'center'
                    }}>

                    <h3 style={{
                          color: '#34475DA3',
                          paddingTop: '10%'
                        }}>{item.description}</h3>
                    <div style={{
                      position: 'relative'
                    }}>
                      <img style={{
                        display: 'flex',
                        height: 'auto',
                      }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle.png') : require('../../assets/uniform_images/helpa-circle.png')}></img>
                      <h3 style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#34475D'
                      }}>{item.title}</h3>
                      </div>
                    </Grid>
                );
              }else{
                // pointing down
                return(
                  <Grid item xs={3} style={{
                    padding: '0% 0% 5% 5%',
                    textAlign: 'center'
                  }}>
                  <div style={{
                    position: 'relative'
                  }}>
                    <img style={{
                    width: '100%',
                    height: 'auto',
                  }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle-1.png') : require('../../assets/uniform_images/helpa-circle-1.png')}></img>
                  <h3 style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#34475D'
                    }}>{item.title}</h3>
                  </div>
                    
                    <h3 style={{
                        color: '#34475DA3'
                      }}>{item.description}</h3>
                    
                  </Grid>
                )
              }
            }else{
              return(
                // last circle
                <Grid item xs={3} style={{
                  padding: '0% 5% 5% 5%',
                  textAlign: 'center'
                }}>
                  <div style={{
                    position: 'relative'
                  }}>
                  <img style={{
                  width: '100%',
                  height: 'auto',
                }} src={theme =='agent' ? require('../../assets/uniform_images/agent-circle-2.png') : require('../../assets/uniform_images/helpa-circle-2.png')}></img>
                  <h3 style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#34475D'
                  }}>{item.title}</h3>
                  </div>
                  <h3 style={{
                      color: '#34475DA3'
                    }}>{item.description}</h3>
                </Grid>
              );
            }
          })
        }
          <Button
          title={'Get Started'}
          style={theme==='agent' ? {
          backgroundColor: '#34475D',color: 'white',
          fontSize: '24px',
          width: '10%'} : {
          backgroundColor: '#E62D7E',color: 'white',
          fontSize: '24px',
          width: '10%'}}
          ></Button>
        </Grid>
    )}
  }
  renderBenefits(){
    const {theme, data, others} = this.state;
    data.map((item, index)=> {
      if(item.payload_value.others != null || item.payload_value.others != undefined){
        others.push(item)
        console.log('others', others)
      }
    })
    if(others.length > 0){
      return(
        <div>
        <Grid style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${bgAgent})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%'
        }} container alignItems={'left'} justifyContent={'left'}>
        {
            others.map((item,index)=>{
              if(index % 2 === 0){
                return(
                  // img left
                  <div key={index} style={{
                    display: 'flex'
                  }}>
                    <Grid item xs={6} style={{
                    padding: '5%',
                    textAlign: 'center',
                    }}>
                      <img style={{
                      width: '80%',
                      height: 'auto',
                    }} src={`${item.payload_value.others.url}`}></img>
                    </Grid>
                    <Grid item xs={4} style={{
                      padding: '5% 5% 5% 5%',
                      textAlign: 'left'
                    }}>
                      <h2 style={{
                        color: ' #34475D'
                      }}>{item.payload_value.others.title}</h2>
                      <p style={{
                        color: '#34475DA3',
                        fontSize: '18px'
                      }}>{item.payload_value.others.description}</p>
                    </Grid> 
                  </div>
                )
              }else{
                return(
                  // img right
                  <div style={{
                    display: 'flex'
                  }}>
                    <Grid item xs={6} style={{
                        padding: '5% 5% 5% 5%',
                        textAlign: 'left'
                      }}>
                        <h2 style={{
                          color: ' #34475D'
                        }}>{item.payload_value.others.title}</h2>
                        <p style={{
                          color: '#34475DA3',
                          fontSize: '18px'
                        }}>{item.payload_value.others.description}</p>
                      </Grid>
                      <Grid item xs={6} style={{
                        padding: '5%',
                        textAlign: 'center'
                      }}>
                        <img style={{
                        width: '80%',
                        height: 'auto',
                      }} src={`${item.payload_value.others.url}`}></img>
                      </Grid>
                  </div>
                )
              }
            })
          }
        </Grid>
      </div>
      )
    }
  }
  renderBanner(){
    const {theme} = this.state;
    return(
      <div>
        <div className={theme === 'helpa' ? 'show' : 'hidden'}>
        <img  className={theme=='helpa' ? 'Helpa' : ''}
        src={require('../../assets/Helpa.png')}></img>
        </div>
        <div className='tooltip' >
        
        <img  className={theme=='agent' ? 'agentRobyn' : ''}
        src={theme =='agent' ? require('../../assets/Robyn.png') : ''}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Robyn': ''}</h3>
              <p >{
              theme ==='agent' ?
              'Robyn is a licence  Real Estate Agent. She just signed four new clients who have all put their properties on the market, and she needs help at the open houses.'
              :
              ''
            }
            </p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img className={theme=='agent' ? 'agentPaul' : 'freelanceSarah'}
        src={theme =='agent' ? require('../../assets/Paul.png') : require('../../assets/Sarah.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Paul': 'Sarah'}</h3>
              <p>{
                theme ==='agent' ?
                'Paul is a senior property manager at a busy real estate office. The agency manages properties, and he has a lot going on dealing with landlords and tenants.'
                :
                "Sarah is a mother of two, a licensed agent with years of experience; due to her family commitments, she is limited by the number of hours she can work each week. However, Sarah's lifestyle dynamics prompted her to find a new way of earning extra money and to be her own boss." 
              }</p>
              <i></i>
            </div>
        
        </div>

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentTrevor' : 'freelanceAlan'}
        src={theme =='agent' ? require('../../assets/Trevor.png') : require('../../assets/Alan.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'Trevor': 'Alan'}</h3>
              <p>
              {
                theme ==='agent' ?
                "Trevor is a Strata Manager at a busy Strata Agents' office. He has a lot going on dealing with annual general meetings, building repairs, tradespeople and budgets."
                :
                "Alan turns to the KeyHelpa platform. It is free to join. He creates his unique business freelancer profile page, selects strata managers category, the days and times he is available to work, and within 2 minutes his profile is live and ready to search for work opportunities in his local area." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'agentJohn' : 'freelanceLana'}
        src={theme =='agent' ? require('../../assets/JohnAgent.png') : require('../../assets/Lana.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? 'John': 'Lana'}</h3>
              <p>
              {
                theme ==='agent' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "Lana is a talented real estate agent with years of experience; due to the epidemic, she works remotely. This has changed the dynamics of her lifestyle and prompted her to find a new way of earning money and become her own boss." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='agent' ? 'Agent' : 'freelanceTracey'}
        src={theme =='agent' ? require('../../assets/Agent.png') : require('../../assets/Tracey.png')}></img>
            <div className='right'>
              <h3>{theme ==='agent' ? '': 'Tracey'}</h3>
              <p>
              {
                theme ==='agent' ?
                ""
                :
                "Tracey is a property manager at a busy real estate office. The agency manages properties, and she has a lot going on dealing with landlords and tenants. She needs additional assistance to manage the overload of work." 
              }
              </p>
              <i></i>
            </div>
        
        </div> 

        <div className='tooltip'>
        
        <img  className={theme=='helpa' ? 'freelanceJohn' : ''}
        src={theme =='helpa' ? require('../../assets/JohnHelpa.png') : ''}></img>
            <div className='right'>
              <h3>{theme =='helpa' ? 'John': ''}</h3>
              <p>
              {
                theme ==='helpa' ?
                "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                :
                "" 
              }
              </p>
              <i></i>
            </div>
        
        </div> 
        
        
        
        <div className={theme === 'agent' ? 'btnLeft' : 'btnRight'}>
          <h1>{theme === 'agent' ? 'Freelancer' : 'Agents'}</h1>
        </div>
      </div>
    )
  }
  render() {
    const {theme, hasFetched} = this.state
    if(!hasFetched){
      return (
        <h3 style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>Loading...</h3>
      )
    }else{
      return (
        <div className={theme === 'agent' ? ' banner-agent' : 'banner-helpa'}>
          
          {
            this.renderBanner()
          }
          {
            this.renderVideo()
          }
          {
            this.renderFeatures()
          }
          {
            this.renderBenefits()
          }
          {
            // theme === 'agent' ? this.renderBenefitsA() : this.renderBenefitsF()
          }
          {
            // console.log(data)
          }
          <Footer/>
        </div>
      )
    }  
  }
}

export default Landing