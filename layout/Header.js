import React, { useState, useEffect } from "react"
import Wallet from '../components/wallet'
import Link from 'next/link'
import classNames from "classnames/bind"
import styles from "../styles/layout.module.scss"
import {
    useRouter
} from 'next/router'
import {
    useTranslation,
    Trans
} from 'next-i18next'
const cx = classNames.bind(styles)

const Header = (props) => {
    const { activeIndex } = props

    const router = useRouter()
    const {
        t
    } = useTranslation('common')
    useEffect(async () => {
        // initNetWork()
    }, [])    

    const initNetWork = async () => {
        let ethereum = window.ethereum
        const data = [
            {
                // chainId: "0x61",
                chainId: "0x38",
                chainName: "Binance Smart Chain Mainnet",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed.binance.org"],
                blockExplorerUrls: ["https://bscscan.com/"],
            },
        ]

        /* eslint-disable */
        const tx = await ethereum.request({ method: "wallet_addEthereumChain", params: data }).catch()
        if (tx) {
            console.log(tx)
        }
    }

    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                anchorElement.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                })
            }
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <i className={styles.logo}></i>
                <dl className={styles.language}>
                    <dt>French</dt>
                    <dt>English</dt>
                </dl>
                <ul id="Menu">
                    <li data-menuanchor="home" onClick={()=>{window.fullpage_api.moveTo(1,1000)}} className={styles.active}>Home</li>
                    <li data-menuanchor="about_ffc" onClick={()=>{ window.fullpage_api.moveTo(2,1000) }} >About FFC</li>
                    <li data-menuanchor="football_ambassador"  onClick={()=>{ window.fullpage_api.moveTo(3,1000) }} >Football Ambassador</li>
                    <li data-menuanchor="roadmap"  onClick={()=>{ window.fullpage_api.moveTo(4,1000) }} >Roadmap</li>
                    <li data-menuanchor="our_partner"  onClick={()=>{ window.fullpage_api.moveTo(5,1000) }} >OUR Partner</li>
                </ul>
                {/* <div className={styles.wallet}>
                    <Wallet />
                </div> */}
                
            </nav>
            {/* <div className={styles.locale}>
                <Link
                    href='#'
                    locale={router.locale === 'en' ? 'zh' : 'en'}
                >
                    {router.locale === 'en' ? "English" : "中文"}
                </Link>
            </div> */}
            {props.children}
        </header>
    )
}

export default Header
