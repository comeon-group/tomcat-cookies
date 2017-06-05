// TODO This is a fix for an issue at Tomcat's end as explained here https://github.com/js-cookie/js-cookie/issues/100.
// Solution for temporary fix is listed here https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md.
// This shall be removed and original js-cookie should be used as soon support for http://www.rfc-base.org/txt/rfc-6265.txt land in tomcat.

import Cookies from 'js-cookie';

const TomcatCookies = Cookies.withConverter({
	write(value) {
		// Encode all characters according to the "encodeURIComponent" spec
		return (
			encodeURIComponent(value)
				// Revert the characters that are unnecessarly encoded but are
				// allowed in a cookie value
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				// Encode the parens that are interpreted incorrectly by Tomcat
				.replace(/[\(\)]/g, escape)
		);
	},
	read(value) {
		return decodeURIComponent(value);
	}
});

export default TomcatCookies;
