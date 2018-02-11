# JavaScript cryptocurrency to fiat converter

Let your site visitors convert Bitcoin, Litecoin, Dogecoin, Litedoge or any other cryptocurrencies to USD, EUR, CNY or any fiat currency.

Demo: http://ldoge.org

![](https://github.com/suchapp/ldoge.org/blob/master/images/example.png?raw=true)

# Example

`index.html`

```
<!doctype html>
<html>
<head>
    <title>Litedoge: So Lite, So Fast! Much Fun!</title>
    <script src="/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript">var local_currency = 'USD';</script>
</head>
<body>
    <p class="converter">
        <label>
            <span id="currency_local_symbol"></span>&nbsp;<input type="number" value="1" id="converter_local" />
        </label>

        <span class="small">&lt;&gt;</span>

        <label>
            <input type="number" id="converter_ldoge" />&nbsp;LDOGE
        </label>

        <span class="small">price data: coinmarketcap</span>
    </p>
    <script src="/js/main.js"></script>
</body>
</html>
```    
    
`main.js`

```
$(document).ready(function(){ 
    /* Converter */
    var price_local;
    $.getJSON( "https://api.coinmarketcap.com/v1/ticker/litedoge/?convert=" + local_currency, function( data ) {
        price_local = data && data[0] != undefined && data[0]['price_'+local_currency.toLowerCase()] != undefined ? data[0]['price_'+local_currency.toLowerCase()] : NaN;
        convert_to_ldoge()
    });

    $('#currency_local_symbol').html(local_currency);

    var convert_to_local = function() {
        $('#converter_local').val($('#converter_ldoge').val()*price_local);
    };

    var convert_to_ldoge = function() {
        $('#converter_ldoge').val(Math.round($('#converter_local').val()/price_local*100)/100);
    };

    $('#converter_ldoge').change(convert_to_local);
    $('#converter_local').change(convert_to_ldoge);

    $('#converter_ldoge').keyup(convert_to_local);
    $('#converter_local').keyup(convert_to_ldoge);
});
```
