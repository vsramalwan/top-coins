import React from 'react';
import { Link } from 'react-router-dom';

import "./../../_assets/stylesheets/mui.min.css";
import "./../../_assets/stylesheets/style.css";
import "./../../_assets/js/mui.min.js";

const Header = () => {
	return(
		<header class="mui-appbar mui--z1">
			<div class="mui-container">
				<table>
					<tr class="mui--appbar-height">
						<td class="mui--text-title">Crypto Analytics</td>
						<td align="mui--text-right">
							<ul class="mui-list--inline mui--text-body2">
								<li><Link to="/">Market Overview</Link></li>
								<li><Link to="/liquidity">Liquidity</Link></li>
							</ul>
						</td>
					</tr>
				</table>
			</div>
		</header>
	)
}

export default Header;