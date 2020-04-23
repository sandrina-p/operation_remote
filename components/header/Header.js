import React from 'react'
import cx from 'classnames'
import Link from 'next/link'

import Theme from '../Theme'
import Styles from './Header.module.css'

const Header = () => {
  // NOTE: IRL this could be a React.useContext(MyProfile).
  const user = { name: 'Julie Howard', role: 'Admin', picUrl: null }

  return (
    <header className={Styles.header}>
      <div className={cx(Theme.u_layout, Styles.inner)}>
        <Link href="#dumb-profile">
          <a className={Styles.profile}>
            <Avatar src={user.picUrl} />
            <div className={Styles.profile_txt}>
              <span className={Theme.t_bold}>{user.name}</span>
              <span className={cx(Theme.t_tiny, Theme.t_bold)}>{user.role}</span>
            </div>
          </a>
        </Link>
      </div>
    </header>
  )
}

// NOTE: this could be its own file, but for now it's okay here.
const Avatar = ({ src }) => {
  if (src) {
    return <img src={src} className={Styles.avatar} alt=""></img>
  }
  return <span className={Styles.avatar} />
}

export default React.memo(Header)
