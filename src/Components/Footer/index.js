import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as GitHub } from '../../assets/github.svg';
import { ReactComponent as Instagram } from '../../assets/instagram.svg';
import { ReactComponent as Discord } from '../../assets/discord.svg';
import { ReactComponent as Linkedin } from '../../assets/linkedin.svg';

import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.content}>
        <p>Versão: 1.0</p>
        <p> Desenvolvido por: <Link to='https://github.com/souzzs' target='_blank'>Caio Souza</Link>.</p>
        <div className={styles.social}>
            <Link to='https://github.com/souzzs' target='_blank'>
                <GitHub />
            </Link>
            <Link to='https://www.instagram.com/chs_souzaa/' target='_blank'>
                <Instagram />
            </Link>
            <Link to='https://discord.com/channels/@me/984461227554115614' target='_blank'>
                <Discord />
            </Link>
            <Link to='' target='_blank'>
                <Linkedin />
            </Link>
        </div>
    </footer>
  )
}

export default Footer