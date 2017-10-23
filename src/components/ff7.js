import React from 'react'
import styled, { css } from 'styled-components'

const FF7 = styled.div`
border: solid 1px #424542;
box-shadow: 1px 1px #e7dfe7,
            -1px -1px #e7dfe7,
            1px -1px #e7dfe7,
            -1px 1px #e7dfe7,
            0 -2px #9c9a9c,
            -2px 0 #7b757b,
            0 2px #424542;
width: 250px;
padding: 5px 10px;
margin: 50px 50px;

background: #04009d;
background: -moz-linear-gradient(top,  #04009d 0%, #06004d 100%);
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#04009d), color-stop(100%,#06004d));
background: -webkit-linear-gradient(top,  #04009d 0%,#06004d 100%);
background: -o-linear-gradient(top,  #04009d 0%,#06004d 100%);
background: -ms-linear-gradient(top,  #04009d 0%,#06004d 100%);
background: linear-gradient(to bottom,  #04009d 0%,#06004d 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#04009d', endColorstr='#06004d',GradientType=0 );

-webkit-border-radius: 7px;
-moz-border-radius: 7px;
border-radius: 7px;

* {
  color: #eff1ff;
  text-shadow: 2px 2px #212421,
               1px 1px #212021;
  font-size: 16px;
  margin: 5px 0;
}
`

export default FF7
