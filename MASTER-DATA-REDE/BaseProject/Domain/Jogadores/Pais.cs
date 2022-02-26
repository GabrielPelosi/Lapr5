using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Pais : IValueObject {
        public String Value {get;private set;}

        public Pais(string paisResidencia)
        {
            isCountry(paisResidencia);
            this.Value = paisResidencia;
        }

        public Pais(){
            
        }

        //metodo que valida o pais, case insensitive? 195 paises
        public void isCountry(string countryOfPlayer){
            Regex rxCountryOfPlayer = new Regex(@"(United States of America|Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina|Burma|Burundi|Cambodia|Cameroon|Canada|Cabo Verde|Central African Republic|Chad|Chile|China|Colombia|Comoros|Democratic Republic of the Congo|Congo|Costa Rica|Croatia|Cuba|Cyprus|Czech Republic|Danzig|Denmark|Djibouti|Dominica|Dominican Republic|EastTimor|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gaza Strip|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Holy See|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|North Korea|South Korea|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Macedonia|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine State|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|SanMarino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|Spain|Sri Lanka|Sudan|Suriname|Swaziland|Sweden|Switzerland|Syria|Tajikistan|Tanzania|Thailand|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe)");
            if (!String.IsNullOrEmpty(countryOfPlayer) && !rxCountryOfPlayer.IsMatch(countryOfPlayer)){
                throw new BusinessRuleValidationException("ERROR! Please insert a valid country.");
            }
        }

        public String PaisJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

