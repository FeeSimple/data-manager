import React from 'react'
import OpenReLogoBlack from '../../img/openre-logo-black.svg'

export default function Footer () {
  return (
    <div class="fs-footer">
      <span class="badge badge-pill badge-fs bold" style={{color: 'white'}}>
        v0.01
      </span>
      {' '}
      Part of the FeeSimple network.
      <span class="created-by">
        {' '}Crafted by
        <a href="" class="p-l-10">
          <img src={OpenReLogoBlack} alt="logo" width="110"/>
        </a>
      </span>
    </div>
  )
}
