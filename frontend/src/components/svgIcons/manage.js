import React from 'react';

export class ManageIcon extends React.PureComponent {
  render() {
    return (
      <svg width="127" height="100" viewBox="0 0 127 100" {...this.props}>
        <g fillRule="nonzero" fill="none">
          <path fill="#929DB3" opacity=".28" d="M7.878 0h110v85.345h-110z" />
          <path
            d="M125.802 72.828l-3.928-.601a17.88 17.88 0 0 0-.859-2.077l2.352-3.203a1.407 1.407 0 0 0-.14-1.83l-5.343-5.345a1.41 1.41 0 0 0-1.83-.139l-3.204 2.352a17.746 17.746 0 0 0-2.077-.86l-.601-3.928A1.41 1.41 0 0 0 108.779 56h-7.558a1.41 1.41 0 0 0-1.393 1.197l-.601 3.929c-.71.242-1.406.53-2.077.859l-3.203-2.352a1.41 1.41 0 0 0-1.83.14l-5.345 5.343a1.407 1.407 0 0 0-.139 1.83l2.352 3.204a17.88 17.88 0 0 0-.86 2.077l-3.928.601A1.41 1.41 0 0 0 83 74.221v7.558c0 .695.51 1.288 1.197 1.393l3.929.601c.242.71.53 1.406.859 2.077l-2.352 3.203a1.407 1.407 0 0 0 .14 1.83l5.343 5.345a1.41 1.41 0 0 0 1.83.14l3.204-2.353c.67.33 1.366.617 2.077.86l.601 3.928c.105.69.698 1.197 1.393 1.197h7.558c.695 0 1.288-.507 1.393-1.197l.601-3.929c.71-.242 1.406-.53 2.077-.859l3.203 2.354a1.41 1.41 0 0 0 1.83-.141l5.345-5.344a1.407 1.407 0 0 0 .139-1.83l-2.352-3.204c.33-.67.617-1.366.86-2.077l3.928-.601A1.41 1.41 0 0 0 127 81.779v-7.558a1.41 1.41 0 0 0-1.198-1.393zm-11.999 5.173a8.803 8.803 0 1 1-17.606-.002 8.803 8.803 0 0 1 17.606.002z"
            fill="currentColor"
            style={{
              mixBlendMode: 'multiply',
            }}
          />
          <rect
            fill="currentColor"
            style={{ mixBlendMode: 'multiply' }}
            y="15"
            width="61"
            height="10"
            rx="2"
          />
          <rect fill="#B8C0CF" x="46" y="33" width="37" height="10" rx="2" />
          <rect fill="#B8C0CF" x="61" y="51" width="22" height="10" rx="2" />
        </g>
      </svg>
    );
  }
}

export class GearIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 16 16" height="16px" width="16px" {...this.props}>
        <g fillRule="evenodd" fill="none" strokeWidth="1" stroke="none">
          <g fillRule="nonzero" fill="currentColor" transform="translate(-390.000000, -297.000000)">
            <g transform="translate(390.000000, 297.000000)">
              <path d="M15.9357621,7.10548699 C15.9104833,6.88077323 15.6484758,6.71191078 15.4219182,6.71191078 C14.6894275,6.71191078 14.0394349,6.28181413 13.7668401,5.61665428 C13.4883569,4.93537546 13.6679257,4.14084758 14.213829,3.64008922 C14.3856654,3.48300372 14.4065428,3.22004461 14.2624238,3.0373829 C13.8875242,2.56130855 13.4614126,2.13127138 12.9961636,1.75857249 C12.8139777,1.61237175 12.5466766,1.63271375 12.3886989,1.80764312 C11.9122677,2.33528625 11.0564758,2.53139033 10.3951822,2.25546468 C9.70700372,1.9659777 9.27304089,1.26863941 9.31550929,0.520089219 C9.32948699,0.284966543 9.15765056,0.080535316 8.92324164,0.0532342007 C8.32618587,-0.0158215613 7.72389591,-0.0179628253 7.12505576,0.0484758364 C6.89332342,0.0740520446 6.72148699,0.273665428 6.72927881,0.505814126 C6.75533086,1.24698885 6.31613383,1.93213383 5.63479554,2.2112119 C4.98141264,2.47809665 4.13162825,2.28365799 3.6561487,1.76071375 C3.49900372,1.58846097 3.23604461,1.56728625 3.05296654,1.7099777 C2.57391822,2.085829 2.13823048,2.51622305 1.75988104,2.98837175 C1.61231227,3.17192565 1.6340223,3.4379777 1.80758364,3.59589591 C2.36389591,4.09968773 2.54352416,4.90111524 2.25451301,5.59024535 C1.97858736,6.24725651 1.29635688,6.67069145 0.515330855,6.67069145 C0.261888476,6.66254275 0.0813680297,6.83265428 0.0536505576,7.06307807 C-0.0166542751,7.66358364 -0.0174869888,8.27544981 0.0502007435,8.88083271 C0.0753011152,9.10649814 0.34527881,9.27387361 0.574334572,9.27387361 C1.27036431,9.25608922 1.9386171,9.68701859 2.21894424,10.3691896 C2.49837918,11.0504684 2.31875093,11.8445204 1.77201487,12.3456952 C1.60101115,12.5027807 1.57930112,12.7653234 1.72342007,12.9479851 C2.09481041,13.421026 2.52098141,13.8514796 2.98789591,14.2272714 C3.17103346,14.3748401 3.43750186,14.3540223 3.59625279,14.1790929 C4.0744684,13.6501413 4.93020074,13.4543941 5.58887732,13.730855 C6.27878067,14.0194498 6.71274349,14.7167286 6.67027509,15.4656952 C6.65641636,15.7009368 6.8290855,15.9057249 7.06254275,15.9326097 C7.36797026,15.9682379 7.67524164,15.9860223 7.98334572,15.9860223 C8.27580669,15.9860223 8.56832714,15.9699628 8.8607881,15.9374275 C9.09257993,15.9118513 9.2642974,15.7122379 9.25650558,15.4796729 C9.2296803,14.7389145 9.66965056,14.0537695 10.3500967,13.7751673 C11.007881,13.5064981 11.8540967,13.7031375 12.3296357,14.2255465 C12.4876729,14.3974424 12.7487881,14.4182007 12.9328773,14.2759851 C13.4110335,13.901026 13.845829,13.4709888 14.2259628,12.9975316 C14.3734721,12.8143941 14.3526543,12.5479257 14.1782007,12.3900669 C13.6218885,11.8862751 13.441368,11.0847286 13.7303792,10.3960743 C14.0020818,9.74780669 14.658974,9.31253532 15.3655316,9.31253532 L15.4643866,9.31509294 C15.6935613,9.33371004 15.9044164,9.15717472 15.9321933,8.92324164 C16.0026171,8.32220074 16.0034498,7.71086989 15.9357621,7.10548699 Z M8.00565056,10.6760446 C6.53543494,10.6760446 5.33953903,9.4801487 5.33953903,8.00993309 C5.33953903,6.53977695 6.53543494,5.34382156 8.00565056,5.34382156 C9.47580669,5.34382156 10.6717026,6.53977695 10.6717026,8.00993309 C10.6717026,9.4801487 9.47580669,10.6760446 8.00565056,10.6760446 Z" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
