function cccCreateCSSSelector (selector, styleRules) {
	var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule){
        (style.styleSheet || style.sheet).addRule(selector, styleRules);
    }else{
        style.sheet.insertRule(selector+"{"+styleRules+"}",0);
    }
}


var fsym = 'LTC';
var tsyms = [

'EUR',

'USD'

];
var cccCurrentConverterTsym = tsyms[0];
var cccLoadingConverterData = false;
var cccConverterPrices = {};

cccConverterPrices['EUR'] = 63.02;

cccConverterPrices['USD'] = 69.55;


function cccConverterLoadRates () {
	var url = 'https://min-api.cryptocompare.com/data/price?fsym=' + fsym + '&tsyms=' + tsyms.join(',');
	var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	cccLoadingConverterData = true;
	xhr.open('get', url, true);
	xhr.onreadystatechange = function() {
		var status;
		var data;
		
		if (xhr.readyState == 4) {
			status = xhr.status;
			if (status == 200) {
				data = JSON.parse(xhr.responseText);
				cccLoadingConverterData = false;
				makeConversion();
				
				for (var i = 0; i < tsyms.length; i++) {
					cccConverterPrices[tsyms[i]] = data[tsyms[i]];
				}
			} else {
				// pass
			}
		}
	};
	xhr.send();
}

function changeRate () {
	cccCurrentConverterTsym = document.getElementById("cccc_tsym_sel_converter").value;
	makeConversion('fsym');
}

function makeConversion (source) {
	if(!cccLoadingConverterData) {
		var fsym_price_elem = document.getElementById('fsym_price');
		var tsym_price_elem = document.getElementById('tsym_price');
		if (source === 'fsym') {
			var result = parseFloat(fsym_price_elem.value) * cccConverterPrices[cccCurrentConverterTsym];
			if (!isNaN(result)) {
				tsym_price_elem.value = Math.round(result * 100) / 100;
			} else {
				tsym_price_elem.value = '';
			}
		}
		else {
			var result = parseFloat(tsym_price_elem.value) / cccConverterPrices[cccCurrentConverterTsym];
			if (!isNaN(result)) {
				fsym_price_elem.value = Math.round(result * 100) / 100;
			} else {
				fsym_price_elem.value = '';
			}		
		}
	}
}

var cccCurrentTheme = {
	General: {
		background: '#FFF',
		borderWidth: '6px',
		borderColor: '#ffcd04',
		borderRadius: '0 0 0 0',
		headerTextColor: '#000',
		headerTextSize: '25px',
		poweredByColor: '#000',
		headerText: 'Krypto Konverter'
	},
	Form: {
		inputBackground: '#FFF',
		borderWidth: '1px',
		borderColor: '#DDD',
		borderRadius: '0 0 0 0',
		labelColor: '#555',
		inputColor: '#000',
		labelFrom: 'Ich gebe',
		labelTo: 'Ich bekomme'
	}
};

if (typeof cccTheme !== 'undefined') {
	for (var key in cccCurrentTheme) {
		var group = cccCurrentTheme[key];
		for (var prop in group) {
			if (!group.hasOwnProperty(prop)) {
				continue;
			}
			if (cccTheme.hasOwnProperty(key) && cccTheme[key].hasOwnProperty(prop)) {
					cccCurrentTheme[key][prop] = cccTheme[key][prop];
			}
		}
	}
}

if (typeof cccThemeV1Converter !== 'undefined') {
	for (var key in cccCurrentTheme) {
		var group = cccCurrentTheme[key];
		for (var prop in group) {
			if (!group.hasOwnProperty(prop)) {
				continue;
			}
			if (cccThemeV1Converter.hasOwnProperty(key) && cccThemeV1Converter[key].hasOwnProperty(prop)) {
					cccCurrentTheme[key][prop] = cccThemeV1Converter[key][prop];
			}
		}
	}
}

var embedable = document.createElement("div");
var embedablePriceInfo = document.createElement("div");

embedable.className = "ccc-widget ccc-converter";

embedablePriceInfo.style.background		= cccCurrentTheme.General.background;
embedablePriceInfo.style.border			= cccCurrentTheme.General.borderWidth + ' solid ' + cccCurrentTheme.General.borderColor;	
embedablePriceInfo.style.borderRadius 	= cccCurrentTheme.General.borderRadius;
embedablePriceInfo.style.color 			= cccCurrentTheme.General.textColor;
embedablePriceInfo.style.padding 		= '15px';
embedablePriceInfo.style.paddingBottom	= '10px';
embedablePriceInfo.style.fontSize 		= '16px';

cccCreateCSSSelector('*', '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;');
cccCreateCSSSelector(':before', '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;');
cccCreateCSSSelector(':after', '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;');
cccCreateCSSSelector('.histoTitleConverter', 'padding-top: 5px; padding-bottom: 5px; font-weight: bold;');
cccCreateCSSSelector('label.priceLabel', 'display: block; padding-top: 10px; padding-bottom: 10px;');
cccCreateCSSSelector('input.priceInput', 'outline: none; border: 1px solid; border-top-left-radius: 4px; border-bottom-left-radius: 4px; border-right: 0; font-size: 16px; box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); padding-left: 10px; height: 30px; display: block; width: 100%;');
cccCreateCSSSelector('.fromSymbolLabel', 'font-size: 18px; text-align: center; line-height: 28px; border: 1px solid #DDD; border-top-right-radius: 4px; border-bottom-right-radius: 4px; width: 110px; float: right;');
cccCreateCSSSelector('.styledSelect', 'float: right; width: 110px; font-weight: 600; outline: none; padding: 0px 15px; border-top-right-radius: 4px; border-bottom-right-radius: 4px; font-size: 18px; color: #444; border: 1px solid rgb(221, 221, 221); height: 30px;  text-align-last:center;');
cccCreateCSSSelector('.poweredByWrapper', 'text-align: right; margin-top: 5px;');
cccCreateCSSSelector('.poweredBy, .poweredBy:hover, .poweredBy:focus', `font-size: 12px; text-decoration: none; color: ${cccCurrentTheme.General.poweredByColor}!important `);


embedablePriceInfo.innerHTML = `
<div
class="histoTitleConverter" style="color:${cccCurrentTheme.General.headerTextColor}; font-size: ${cccCurrentTheme.General.headerTextSize}; ">
	${cccCurrentTheme.General.headerText}
</div>
<div class="convertForm" style="font-weight: 600;">
	<form>
		<label
			for="fsym_price"
			class="priceLabel"
			style="color:` + cccCurrentTheme.Form.labelColor + `"
		>
			${cccCurrentTheme.Form.labelFrom}
		</label>
		<div class="section-converter-ccc">
			<div
				class="fromSymbolLabel"
				style="background-color: ` + cccCurrentTheme.Form.inputBackground + `; color: ` + cccCurrentTheme.Form.inputColor + `; border-color: ` + cccCurrentTheme.Form.borderColor + `"
			>
				LTC
			</div>
			<div style="margin-right: 110px;">
				<input type="text" id="fsym_price" class="priceInput" onkeyup="makeConversion('fsym')" style="background-color: ` + cccCurrentTheme.Form.inputBackground + `;border-color: ` + cccCurrentTheme.Form.borderColor + `; color: ` + cccCurrentTheme.Form.inputColor + `; border-radius: ` + cccCurrentTheme.Form.borderRadius + `"/>
			</div>
		</div>
		<label
			for="tsym_price"
			class="priceLabel"
			style="border-color: ` + cccCurrentTheme.Form.borderColor + `; color: ` + cccCurrentTheme.Form.labelColor + `"
		>
			${cccCurrentTheme.Form.labelTo}
		</label>
		<div class="section-converter-ccc">
			<select
				id="cccc_tsym_sel_converter"
				onchange="changeRate('fsym')"
				class="styledSelect"
				style="color: ` + cccCurrentTheme.Form.inputColor + `; border-color: ` + cccCurrentTheme.Form.borderColor + `; background-color: ` + cccCurrentTheme.Form.inputBackground + `"
			>
				
				<option value="EUR">EUR</option>
				
				<option value="USD">USD</option>
				
			</select>			
			<div style="margin-right: 110px;">
				<input type="text" id="tsym_price" class="priceInput" style="background: ` + cccCurrentTheme.Form.inputBackground + `; border-color: ` + cccCurrentTheme.Form.borderColor + `; color: ` + cccCurrentTheme.Form.inputColor + `; border-radius: ` + cccCurrentTheme.Form.borderRadius + `" onkeyup="makeConversion('tsym')" />
			</div>
		</div>
	</form>
	<div class="poweredByWrapper">
		<a href="https://www.cryptoview.at" target="_blank" class="poweredBy" rel="nofollow">
			<span style="vertical-align: middle;">Powered by</span>
			<img
				src="img/crypptoview-logo.png"
				width="100"
				height="22"
				style="vertical-align: middle;"
			/>
		</a>
	</div>
</div>`;

embedable.appendChild(embedablePriceInfo);



document.currentScript.parentNode.appendChild(embedable);
var cccConverterLoadRatesInterval = setInterval(cccConverterLoadRates, 30000);