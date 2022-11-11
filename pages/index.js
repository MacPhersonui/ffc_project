import React, { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Timer from "react-compound-timer"
import Web3 from "web3"
import Wallet from "../components/wallet"
import useWallet from "use-wallet"
import {
    getInvite,
    getInviteRank,
    createInvite
} from "../api/api"
import tokenConfig from "../contract.config"
import { confirmAlert } from "react-confirm-alert"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import {
    ToastContainer,
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    withRouter
} from "next/router"
import {
    useTranslation,
    Trans
} from 'next-i18next'
import {
    serverSideTranslations
} from 'next-i18next/serverSideTranslations'
import Cookies from 'js-cookie'
import {
    utils
} from "ethers"
import {
    Swiper,
    SwiperSlide
} from "swiper/react"

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import {
    Navigation,
    Pagination,
    Keyboard,
    FreeMode,
    Thumbs,
    Autoplay,
    EffectCoverflow,
    EffectCards
} from "swiper"
import 'animate.css'
import ReactFullpage from '@fullpage/react-fullpage'
const cx = classNames.bind(styles)

const toastConfig = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: null,
    pauseOnHover: false,
}


const Home = ({
    router
}) => {

    const {
        t
    } = useTranslation('common')

    const wallet = useWallet()
    const {
        account,
        ethereum
    } = wallet

    const web3 = new Web3(ethereum)
    const [swapCount, setSwapCount] = useState(4)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [thumbsSwiper2, setThumbsSwiper2] = useState(null)
    const [qaActive, setQaActive] = useState(1)
    const [scrolling, setScrolling] = useState(false)
    useEffect(() => {
        const timer = setInterval(async () => {
            if (account) {

            }
            clearInterval(timer)
        }, 3000)


        const windowWidth = document.body.clientWidth
        if (windowWidth <= 600) {
            setSwapCount(1)
        }
        const handleScroll = event => {
            console.log('window.scrollY', window.scrollY)
            // console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
            console.log("events", event)
        }

        window.addEventListener('scroll', handleScroll)

        //loading
        document.getElementById("loading").classList.add("animate__animated", "animate__fadeOut", "animate__slower")
        setTimeout(() => {
            document.getElementById("loading").classList.add("none")
        }, 2000)


        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [account])

    const afterLoad = (origin, destination, direction, trigger) => {
        console.log("afterLoad", origin, destination, direction, trigger)
        console.log(origin.index)
        setScrolling(false)
        if (origin.index == 0) {
            document.getElementById("solgen_logo").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-2s")
            document.getElementById("solgen_title").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_subtitle").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_team").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_video").classList.add("animate__animated", "animate__fadeInRight", "animate__fast", "animate__delay-2s")
        }
    }

    const onLeave = (section, origin, destination, direction) => {
      setScrolling(true)
      console.log("onLeave", section, origin, destination, direction)
    }


    return (
      <HeaderFooter activeIndex={1} scrolling={scrolling}>
        <ToastContainer />
        <div id="loading" className={styles.loading}>
          <i></i>
        </div>
        <video
          className={styles.bg_video}
          autoPlay={true}
          playsInline={true}
          loop={true}
          muted={true}
          poster="/home/cover.jpg"
        >
          <source src="/home/bg_video.mp4" type="video/mp4" />
        </video>
        <main className={styles.container}>
          <ReactFullpage
            //fullpage options
            licenseKey={'YOUR_KEY_HERE'}
            scrollingSpeed={1000} /* Options here */
            afterLoad={afterLoad}
            onLeave={onLeave}
            anchors={[
              'home',
              'about_ffc',
              'football_ambassador',
              'roadmap',
              'our_partner'
            ]}
            menu="#Menu"
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  <div className={styles.solgen + ' section'}>
                    <div className={styles.solgen_content}>
                      <i>
                        {t('build_the_first_league')}
                        {t('in_the_web3_world')} {t('build_the_first_league')}{' '}
                        {t('in_the_web3_world')} {t('build_the_first_league')}{' '}
                        {t('in_the_web3_world')}
                      </i>
                      <div className={styles.text}>
                        <div
                          id="solgen_logo"
                          className={styles.solgen_logo}
                        ></div>
                        <h1 id="solgen_title">
                          <p>{t('ffc')}</p>
                          <p>{t('to_web3')}</p>
                        </h1>
                        <h2 id="solgen_subtitle">
                          {t('build_the_first_league')}
                          {t('in_the_web3_world')}
                        </h2>
                      </div>
                      <div id="solgen_team" className={styles.team}>
                        <Swiper
                          slidesPerView={7}
                          spaceBetween={10}
                          pagination={{
                            clickable: true
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                          }}
                          modules={[Autoplay, Pagination]}
                          className={styles.team_swiper}
                        >
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                        </Swiper>
                        <button>More Club &gt;&gt;</button>
                      </div>
                    </div>
                    <div className={styles.video}>
                      <div id="solgen_video" className={styles.video_warpper}>
                        <Swiper
                          style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff'
                          }}
                          loop={true}
                          spaceBetween={10}
                          speed={300}
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper2"
                        >
                          <SwiperSlide className={styles.swiper_silde}>
                            {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
                            <video
                              src="/home/bg_video.mp4"
                              controls={true}
                              autoPlay={true}
                              playsInline={true}
                              loop={true}
                              muted={true}
                              poster="/home/cover.jpg"
                            />
                          </SwiperSlide>
                          {/* <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide> */}
                        </Swiper>
                        {/* <Swiper
                                                onSwiper={setThumbsSwiper}
                                                // loop={true}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                freeMode={true}
                                                watchSlidesProgress={true}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="mySwiper"
                                            >
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                            </Swiper> */}
                      </div>
                    </div>
                  </div>
                  <div className={styles.what_is_ffc + ' section'}>
                    <i className={styles.flag}>
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#fff',
                          '--swiper-pagination-color': '#fff'
                        }}
                        loop={true}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper2 }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('what_is_ffc_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_token_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_nft_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_gamefi_content')}
                        </SwiperSlide>
                      </Swiper>
                      <Swiper
                        onSwiper={setThumbsSwiper2}
                        // loop={true}
                        spaceBetween={30}
                        slidesPerView={4}
                        freeMode={true}
                        speed={300}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                      >
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('what_is_ffc')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_token')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_nft')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_gamefi')}</i>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  <div className={styles.football_ambassador + ' section'}>
                    <i className={styles.flag}>
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')}{' '}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        className="mySwiper card"
                        loop={true}
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false
                        }}
                        cardsEffect={{
                          perSlideOffset: 8,
                          perSlideRotate: 5,
                          Rotate: true,
                          slideShadows: false
                          // transformEl:"active"
                        }}
                        modules={[EffectCards, Autoplay]}
                      >
                        <SwiperSlide className={styles.player + ' player'}>
                          <div className={styles.player_item}>
                            <span
                              className={cx(styles.cover, styles.player1)}
                            ></span>
                            <h1>{t('gianluigi_donnarumma')}</h1>
                            <p>{t('gianluigi_donnarumma_content1')}</p>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <div className={styles.player_item}>
                            <span
                              className={cx(styles.cover, styles.player2)}
                            ></span>
                            <h1>{t('achraf_hakimi')}</h1>
                            <p>{t('achraf_hakimi_content1')}</p>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <div className={styles.player_item}>
                            <span
                              className={cx(styles.cover, styles.player3)}
                            ></span>
                            <h1>{t('marco_verratti')}</h1>
                            <p>{t('marco_verratti_content1')}</p>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <div className={styles.player_item}>
                            <span
                              className={cx(styles.cover, styles.player4)}
                            ></span>
                            <h1>{t('lucas_hernández')}</h1>
                            <p>{t('lucas_hernández_content1')}</p>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <div className={styles.player_item}>
                            <span
                              className={cx(styles.cover, styles.player5)}
                            ></span>
                            <h1>{t('lucas_hernández')}</h1>
                            <p>{t('lucas_hernández_content1')}</p>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  <div className={styles.roadmap + ' section'}>
                    <i className={styles.flag}>
                      {t('roadmap')} {t('roadmap')} {t('roadmap')}{' '}
                      {t('roadmap')} {t('roadmap')} {t('roadmap')}{' '}
                      {t('roadmap')}{' '}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <ul>
                        <li>
                          <h1>{t('roadmap_time1')}</h1>
                          <h2>{t('roadmap_time1_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time2')}</h1>
                          <h2>{t('roadmap_time2_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time3')}</h1>
                          <h2>{t('roadmap_time3_content1')}</h2>
                          <h2>{t('roadmap_time3_content2')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time4')}</h1>
                          <h2>{t('roadmap_time4_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time5')}</h1>
                          <h2>{t('roadmap_time5_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time6')}</h1>
                          <h2>{t('roadmap_time6_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time7')}</h1>
                          <h2>{t('roadmap_time7_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time8')}</h1>
                          <h2>{t('roadmap_time8_content1')}</h2>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.partner + ' section'}>
                    <i className={styles.flag}>
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')}{' '}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <Swiper
                        // loop={true}
                        slidesPerView={swapCount === 1 ? 1 : 5}
                        spaceBetween={10}
                        navigation={swapCount !== 1}
                        modules={[Navigation, Pagination, Keyboard]}
                        className={styles.outer}
                      >
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  ]
                  <div className={styles.qa + ' section'}>
                    <i className={styles.flag}>
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')}{' '}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <ul>
                        <li
                          className={cx({ active: qaActive == 1 })}
                          onClick={() => {
                            setQaActive(1)
                          }}
                        >
                          <i>Q1</i>
                          <h1>{t('q1_q')}</h1>
                          <p>{t('q1_a')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 2 })}
                          onClick={() => {
                            setQaActive(2)
                          }}
                        >
                          <i>Q2</i>
                          <h1>{t('q2_q')}</h1>
                          <p>{t('q2_a')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 3 })}
                          onClick={() => {
                            setQaActive(3)
                          }}
                        >
                          <i>Q3</i>
                          <h1>{t('q3_q')}</h1>
                          <p>{t('q3_a')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 4 })}
                          onClick={() => {
                            setQaActive(4)
                          }}
                        >
                          <i>Q4</i>
                          <h1>{t('q4_q')}</h1>
                          <p>{t('q4_a')}</p>
                          <>
                            <p>
                              <span>
                                Introduction:&nbsp; NFT - FFC League Rights Card
                              </span>
                            </p>
                            <p>
                              <span>Amount: 1650</span>
                            </p>
                            <p>
                              <span>Price:&nbsp;</span>
                            </p>
                            <p>
                              <span>Phase 1: 0.15 ETH, 300 NFTs&nbsp;</span>
                            </p>
                            <p>
                              <span>Phase 2: 0.25 ETH, 500 NFTs</span>
                            </p>
                            <p>
                              <span>Phase 3: 0.3 ETH, 850 NFTs</span>
                            </p>
                            <p>
                              <span>
                                Rights: FFC League Rights Card = 1NFT + 2000
                                $FFC
                              </span>
                            </p>
                            <p>
                              <br />
                            </p>
                            <p>
                              <span>—— Holders with the following rights</span>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    Airdrops for 2000 $FFC each FFC League
                                    Rights Card
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    100% getting a random airdrop for star card
                                    NFT issued based on Chiliz
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    Priority subscription to limited star, club
                                    NFT
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    Experience the closed beta of the FFC
                                    ecological football game and get airdrops
                                    for prop
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    Discounted purchases or a chance to get
                                    other football merchandise, such as
                                    star-autographed jerseys, for free
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <p>
                                  <span>
                                    Rights of drawing tickets for Ligue 1
                                    matches and group photos of stars
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <p>
                              <br />
                            </p>
                          </>
                        </li>
                        <li
                          className={cx({ active: qaActive == 5 })}
                          onClick={() => {
                            setQaActive(5)
                          }}
                        >
                          <i>Q5</i>
                          <h1>{t('q5_q')}</h1>
                          <p>{t('q5_a')}</p>
                          <>
                            <p>- League of FFC Unique Circulating Tokens</p>
                            <p>- FFC GAME Unique Governance Tokens</p>
                            <p>
                              - Unique Purchase Tokens Of Football Star Card
                            </p>
                            <p>- Fan Loyalty Vote</p>
                            <p>- Buy Club Peripherals</p>
                            <p>- Discounted Match Tickets</p>
                            <p>- Affiliate Web3 Earnings Dividend Voucher</p>
                            <p>
                              <br />
                            </p>
                            <p>
                              <span>Token Symbol: FFC</span>
                            </p>
                            <p>
                              <span>Total Supply: 700,000,000</span>
                            </p>
                            <p>
                              <span>Total Circulation: 33,000,000</span>
                            </p>
                            <p>
                              <span>Distribution:</span>
                            </p>
                            <p>
                              <span>Bonus share with NFT: 4.71%</span>
                            </p>
                            <p>
                              <span>Market: 15.29%</span>
                            </p>
                            <p>
                              <span>
                                Team Incentive: 10% will be released linear in
                                24 months after locking for one year
                              </span>
                            </p>
                            <p>
                              <span>
                                Ecological alliance team: 20% will be released
                                linear in 24 months after locking for one year
                              </span>
                            </p>
                            <p>
                              <span>
                                Ecological incentive: 30% will be released
                                linear in 24 months after lock-up for one year
                              </span>
                            </p>
                            <p>
                              <span>
                                Developer funds: 20% will be released linear in
                                24 months after lock-up for one year
                              </span>
                            </p>
                          </>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              )
            }}
          />
        </main>
      </HeaderFooter>
    )
}

export const getStaticProps = async ({
    locale
}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default withRouter(Home)
