import React, { Fragment, type ReactElement } from 'react'

import AuthRequired from './AuthRequired'
import Header from '../Header'

const Layout = (): ReactElement => {
  return (
    <Fragment>
      <Header />

      <div className='container-page'>
        <AuthRequired />
      </div>
    </Fragment>
  )
}

export default Layout
