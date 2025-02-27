export enum WeightUnit {
    Kg = 0,
    Lb = 1
}

export enum DimensionUnit {
    Cm = 0,
    Inch = 1
}

export enum Currency {
    AED = 0, AFN = 1, ALL = 2, AMD = 3, ANG = 4, AOA = 5, ARS = 6, AUD = 7, AWG = 8, AZN = 9,
    BAM = 10, BBD = 11, BDT = 12, BGN = 13, BHD = 14, BIF = 15, BMD = 16, BND = 17, BOB = 18,
    BRL = 19, BSD = 20, BTN = 21, BWP = 22, BYN = 23, BZD = 24, CAD = 25, CDF = 26, CHF = 27,
    CLP = 28, CNY = 29, COP = 30, CRC = 31, CUC = 32, CUP = 33, CVE = 34, CZK = 35, DJF = 36,
    DKK = 37, DOP = 38, DZD = 39, EGP = 40, ERN = 41, ETB = 42, EUR = 43, FJD = 44, FKP = 45,
    GBP = 46, GEL = 47, GGP = 48, GHS = 49, GIP = 50, GMD = 51, GNF = 52, GTQ = 53, GYD = 54,
    HKD = 55, HNL = 56, HRK = 57, HTG = 58, HUF = 59, IDR = 60, ILS = 61, IMP = 62, INR = 63,
    IQD = 64, IRR = 65, ISK = 66, JEP = 67, JMD = 68, JOD = 69, JPY = 70, KES = 71, KGS = 72,
    KHR = 73, KMF = 74, KPW = 75, KRW = 76, KWD = 77, KYD = 78, KZT = 79, LAK = 80, LBP = 81,
    LKR = 82, LRD = 83, LSL = 84, LYD = 85, MAD = 86, MDL = 87, MGA = 88, MKD = 89, MMK = 90,
    MNT = 91, MOP = 92, MRU = 93, MUR = 94, MVR = 95, MWK = 96, MXN = 97, MYR = 98, MZN = 99,
    NAD = 100, NGN = 101, NIO = 102, NOK = 103, NPR = 104, NZD = 105, OMR = 106, PAB = 107,
    PEN = 108, PGK = 109, PHP = 110, PKR = 111, PLN = 112, PYG = 113, QAR = 114, RON = 115,
    RSD = 116, RUB = 117, RWF = 118, SAR = 119, SBD = 120, SCR = 121, SDG = 122, SEK = 123,
    SGD = 124, SHP = 125, SLL = 126, SOS = 127, SRD = 128, SSP = 129, STN = 130, SVC = 131,
    SYP = 132, SZL = 133, THB = 134, TJS = 135, TMT = 136, TND = 137, TOP = 138, TRY = 139,
    TTD = 140, TWD = 141, TZS = 142, UAH = 143, UGX = 144, USD = 145, UYU = 146, UZS = 147,
    VES = 148, VND = 149, VUV = 150, WST = 151, XAF = 152, XCD = 153, XDR = 154, XOF = 155,
    XPF = 156, YER = 157, ZAR = 158, ZMW = 159, ZWL = 160
}

export enum BranchStatus {
  Active = 1,
  InActive = 2,
  Deleted = 3,
  Draft = 4
}

export enum Country {
    AF = 0, // Afghanistan
    AX = 1, // Åland Islands
    AL = 2, // Albania
    DZ = 3, // Algeria
    AS = 4, // American Samoa
    AD = 5, // Andorra
    AO = 6, // Angola
    AI = 7, // Anguilla
    AQ = 8, // Antarctica
    AG = 9, // Antigua and Barbuda
    AR = 10, // Argentina
    AM = 11, // Armenia
    AW = 12, // Aruba
    AU = 13, // Australia
    AT = 14, // Austria
    AZ = 15, // Azerbaijan
    BS = 16, // Bahamas
    BH = 17, // Bahrain
    BD = 18, // Bangladesh
    BB = 19, // Barbados
    BY = 20, // Belarus
    BE = 21, // Belgium
    BZ = 22, // Belize
    BJ = 23, // Benin
    BM = 24, // Bermuda
    BT = 25, // Bhutan
    BO = 26, // Bolivia
    BQ = 27, // Bonaire
    BA = 28, // Bosnia and Herzegovina
    BW = 29, // Botswana
    BV = 30, // Bouvet Island
    BR = 31, // Brazil
    IO = 32, // British Indian Ocean Territory
    BN = 33, // Brunei
    BG = 34, // Bulgaria
    BF = 35, // Burkina Faso
    BI = 36, // Burundi
    CV = 37, // Cabo Verde
    KH = 38, // Cambodia
    CM = 39, // Cameroon
    CA = 40, // Canada
    KY = 41, // Cayman Islands
    CF = 42, // Central African Republic
    TD = 43, // Chad
    CL = 44, // Chile
    CN = 45, // China
    CX = 46, // Christmas Island
    CC = 47, // Cocos Islands
    CO = 48, // Colombia
    KM = 49, // Comoros
    CG = 50, // Congo
    CD = 51, // Congo Democratic Republic
    CK = 52, // Cook Islands
    CR = 53, // Costa Rica
    CI = 54, // Côte d'Ivoire
    HR = 55, // Croatia
    CU = 56, // Cuba
    CW = 57, // Curaçao
    CY = 58, // Cyprus
    CZ = 59, // Czech Republic
    DK = 60, // Denmark
    DJ = 61, // Djibouti
    DM = 62, // Dominica
    DO = 63, // Dominican Republic
    EC = 64, // Ecuador
    EG = 65, // Egypt
    SV = 66, // El Salvador
    GQ = 67, // Equatorial Guinea
    ER = 68, // Eritrea
    EE = 69, // Estonia
    SZ = 70, // Eswatini
    ET = 71, // Ethiopia
    FK = 72, // Falkland Islands
    FO = 73, // Faroe Islands
    FJ = 74, // Fiji
    FI = 75, // Finland
    FR = 76, // France
    GF = 77, // French Guiana
    PF = 78, // French Polynesia
    TF = 79, // French Southern Territories
    GA = 80, // Gabon
    GM = 81, // Gambia
    GE = 82, // Georgia
    DE = 83, // Germany
    GH = 84, // Ghana
    GI = 85, // Gibraltar
    GR = 86, // Greece
    GL = 87, // Greenland
    GD = 88, // Grenada
    GP = 89, // Guadeloupe
    GU = 90, // Guam
    GT = 91, // Guatemala
    GG = 92, // Guernsey
    GN = 93, // Guinea
    GW = 94, // Guinea-Bissau
    GY = 95, // Guyana
    HT = 96, // Haiti
    HM = 97, // Heard Island and McDonald Islands
    VA = 98, // Holy See
    HN = 99, // Honduras
    HK = 100, // Hong Kong
    HU = 101, // Hungary
    IS = 102, // Iceland
    IN = 103, // India
    ID = 104, // Indonesia
    IR = 105, // Iran
    IQ = 106, // Iraq
    IE = 107, // Ireland
    IM = 108, // Isle of Man
    IL = 109, // Israel
    IT = 110, // Italy
    JM = 111, // Jamaica
    JP = 112, // Japan
    JE = 113, // Jersey
    JO = 114, // Jordan
    KZ = 115, // Kazakhstan
    KE = 116, // Kenya
    KI = 117, // Kiribati
    KP = 118, // North Korea
    KR = 119, // South Korea
    KW = 120, // Kuwait
    KG = 121, // Kyrgyzstan
    LA = 122, // Laos
    LV = 123, // Latvia
    LB = 124, // Lebanon
    LS = 125, // Lesotho
    LR = 126, // Liberia
    LY = 127, // Libya
    LI = 128, // Liechtenstein
    LT = 129, // Lithuania
    LU = 130, // Luxembourg
    MO = 131, // Macao
    MG = 132, // Madagascar
    MW = 133, // Malawi
    MY = 134, // Malaysia
    MV = 135, // Maldives
    ML = 136, // Mali
    MT = 137, // Malta
    MH = 138, // Marshall Islands
    MQ = 139, // Martinique
    MR = 140, // Mauritania
    MU = 141, // Mauritius
    YT = 142, // Mayotte
    MX = 143, // Mexico
    FM = 144, // Micronesia
    MD = 145, // Moldova
    MC = 146, // Monaco
    MN = 147, // Mongolia
    ME = 148, // Montenegro
    MS = 149, // Montserrat
    MA = 150, // Morocco
    MZ = 151, // Mozambique
    MM = 152, // Myanmar
    NA = 153, // Namibia
    NR = 154, // Nauru
    NP = 155, // Nepal
    NL = 156, // Netherlands
    NC = 157, // New Caledonia
    NZ = 158, // New Zealand
    NI = 159, // Nicaragua
    NE = 160, // Niger
    NG = 161, // Nigeria
    NU = 162, // Niue
    NF = 163, // Norfolk Island
    MK = 164, // North Macedonia
    MP = 165, // Northern Mariana Islands
    NO = 166, // Norway
    OM = 167, // Oman
    PK = 168, // Pakistan
    PW = 169, // Palau
    PS = 170, // Palestine
    PA = 171, // Panama
    PG = 172, // Papua New Guinea
    PY = 173, // Paraguay
    PE = 174, // Peru
    PH = 175, // Philippines
    PN = 176, // Pitcairn
    PL = 177, // Poland
    PT = 178, // Portugal
    PR = 179, // Puerto Rico
    QA = 180, // Qatar
    RE = 181, // Réunion
    RO = 182, // Romania
    RU = 183, // Russia
    RW = 184, // Rwanda
    BL = 185, // Saint Barthélemy
    SH = 186, // Saint Helena
    KN = 187, // Saint Kitts and Nevis
    LC = 188, // Saint Lucia
    MF = 189, // Saint Martin
    PM = 190, // Saint Pierre and Miquelon
    VC = 191, // Saint Vincent and the Grenadines
    WS = 192, // Samoa
    SM = 193, // San Marino
    ST = 194, // Sao Tome and Principe
    SA = 195, // Saudi Arabia
    SN = 196, // Senegal
    RS = 197, // Serbia
    SC = 198, // Seychelles
    SL = 199, // Sierra Leone
    SG = 200, // Singapore
    SX = 201, // Sint Maarten
    SK = 202, // Slovakia
    SI = 203, // Slovenia
    SB = 204, // Solomon Islands
    SO = 205, // Somalia
    ZA = 206, // South Africa
    GS = 207, // South Georgia and South Sandwich Islands
    SS = 208, // South Sudan
    ES = 209, // Spain
    LK = 210, // Sri Lanka
    SD = 211, // Sudan
    SR = 212, // Suriname
    SJ = 213, // Svalbard and Jan Mayen
    SE = 214, // Sweden
    CH = 215, // Switzerland
    SY = 216, // Syria
    TW = 217, // Taiwan
    TJ = 218, // Tajikistan
    TZ = 219, // Tanzania
    TH = 220, // Thailand
    TL = 221, // Timor-Leste
    TG = 222, // Togo
    TK = 223, // Tokelau
    TO = 224, // Tonga
    TT = 225, // Trinidad and Tobago
    TN = 226, // Tunisia
    TR = 227, // Turkey
    TM = 228, // Turkmenistan
    TC = 229, // Turks and Caicos Islands
    TV = 230, // Tuvalu
    UG = 231, // Uganda
    UA = 232, // Ukraine
    AE = 233, // United Arab Emirates
    GB = 234, // United Kingdom
    US = 235, // United States
    UM = 236, // United States Minor Outlying Islands
    UY = 237, // Uruguay
    UZ = 238, // Uzbekistan
    VU = 239, // Vanuatu
    VE = 240, // Venezuela
    VN = 241, // Vietnam
    VG = 242, // Virgin Islands (British)
    VI = 243, // Virgin Islands (U.S.)
    WF = 244, // Wallis and Futuna
    EH = 245, // Western Sahara
    YE = 246, // Yemen
    ZM = 247, // Zambia
    ZW = 248  // Zimbabwe
}

// Add a helper function to get country names
export function getCountryName(code: Country): string {
    const countryNames: { [key: number]: string } = {
        [Country.AF]: 'Afghanistan',
        [Country.AX]: 'Åland Islands',
        [Country.AL]: 'Albania',
        [Country.DZ]: 'Algeria',
        [Country.AS]: 'American Samoa',
        [Country.AD]: 'Andorra',
        [Country.AO]: 'Angola',
        [Country.AI]: 'Anguilla',
        [Country.AQ]: 'Antarctica',
        [Country.AG]: 'Antigua and Barbuda',
        [Country.AR]: 'Argentina',
        [Country.AM]: 'Armenia',
        [Country.AW]: 'Aruba',
        [Country.AU]: 'Australia',
        [Country.AT]: 'Austria',
        [Country.AZ]: 'Azerbaijan',
        [Country.BS]: 'Bahamas',
        [Country.BH]: 'Bahrain',
        [Country.BD]: 'Bangladesh',
        [Country.BB]: 'Barbados',
        [Country.BY]: 'Belarus',
        [Country.BE]: 'Belgium',
        [Country.BZ]: 'Belize',
        [Country.BJ]: 'Benin',
        [Country.BM]: 'Bermuda',
        [Country.BT]: 'Bhutan',
        [Country.BO]: 'Bolivia',
        [Country.BQ]: 'Bonaire',
        [Country.BA]: 'Bosnia and Herzegovina',
        [Country.BW]: 'Botswana',
        [Country.BV]: 'Bouvet Island',
        [Country.BR]: 'Brazil',
        [Country.IO]: 'British Indian Ocean Territory',
        [Country.BN]: 'Brunei',
        [Country.BG]: 'Bulgaria',
        [Country.BF]: 'Burkina Faso',
        [Country.BI]: 'Burundi',
        [Country.CV]: 'Cabo Verde',
        [Country.KH]: 'Cambodia',
        [Country.CM]: 'Cameroon',
        [Country.CA]: 'Canada',
        [Country.KY]: 'Cayman Islands',
        [Country.CF]: 'Central African Republic',
        [Country.TD]: 'Chad',
        [Country.CL]: 'Chile',
        [Country.CN]: 'China',
        [Country.CX]: 'Christmas Island',
        [Country.CC]: 'Cocos Islands',
        [Country.CO]: 'Colombia',
        [Country.KM]: 'Comoros',
        [Country.CG]: 'Congo',
        [Country.CD]: 'Congo Democratic Republic',
        [Country.CK]: 'Cook Islands',
        [Country.CR]: 'Costa Rica',
        [Country.CI]: 'Côte d\'Ivoire',
        [Country.HR]: 'Croatia',
        [Country.CU]: 'Cuba',
        [Country.CW]: 'Curaçao',
        [Country.CY]: 'Cyprus',
        [Country.CZ]: 'Czech Republic',
        [Country.DK]: 'Denmark',
        [Country.DJ]: 'Djibouti',
        [Country.DM]: 'Dominica',
        [Country.DO]: 'Dominican Republic',
        [Country.EC]: 'Ecuador',
        [Country.EG]: 'Egypt',
        [Country.SV]: 'El Salvador',
        [Country.GQ]: 'Equatorial Guinea',
        [Country.ER]: 'Eritrea',
        [Country.EE]: 'Estonia',
        [Country.SZ]: 'Eswatini',
        [Country.ET]: 'Ethiopia',
        [Country.FK]: 'Falkland Islands',
        [Country.FO]: 'Faroe Islands',
        [Country.FJ]: 'Fiji',
        [Country.FI]: 'Finland',
        [Country.FR]: 'France',
        [Country.GF]: 'French Guiana',
        [Country.PF]: 'French Polynesia',
        [Country.TF]: 'French Southern Territories',
        [Country.GA]: 'Gabon',
        [Country.GM]: 'Gambia',
        [Country.GE]: 'Georgia',
        [Country.DE]: 'Germany',
        [Country.GH]: 'Ghana',
        [Country.GI]: 'Gibraltar',
        [Country.GR]: 'Greece',
        [Country.GL]: 'Greenland',
        [Country.GD]: 'Grenada',
        [Country.GP]: 'Guadeloupe',
        [Country.GU]: 'Guam',
        [Country.GT]: 'Guatemala',
        [Country.GG]: 'Guernsey',
        [Country.GN]: 'Guinea',
        [Country.GW]: 'Guinea-Bissau',
        [Country.GY]: 'Guyana',
        [Country.HT]: 'Haiti',
        [Country.HM]: 'Heard Island and McDonald Islands',
        [Country.VA]: 'Holy See',
        [Country.HN]: 'Honduras',
        [Country.HK]: 'Hong Kong',
        [Country.HU]: 'Hungary',
        [Country.IS]: 'Iceland',
        [Country.IN]: 'India',
        [Country.ID]: 'Indonesia',
        [Country.IR]: 'Iran',
        [Country.IQ]: 'Iraq',
        [Country.IE]: 'Ireland',
        [Country.IM]: 'Isle of Man',
        [Country.IL]: 'Israel',
        [Country.IT]: 'Italy',
        [Country.JM]: 'Jamaica',
        [Country.JP]: 'Japan',
        [Country.JE]: 'Jersey',
        [Country.JO]: 'Jordan',
        [Country.KZ]: 'Kazakhstan',
        [Country.KE]: 'Kenya',
        [Country.KI]: 'Kiribati',
        [Country.KP]: 'North Korea',
        [Country.KR]: 'South Korea',
        [Country.KW]: 'Kuwait',
        [Country.KG]: 'Kyrgyzstan',
        [Country.LA]: 'Laos',
        [Country.LV]: 'Latvia',
        [Country.LB]: 'Lebanon',
        [Country.LS]: 'Lesotho',
        [Country.LR]: 'Liberia',
        [Country.LY]: 'Libya',
        [Country.LI]: 'Liechtenstein',
        [Country.LT]: 'Lithuania',
        [Country.LU]: 'Luxembourg',
        [Country.MO]: 'Macao',
        [Country.MG]: 'Madagascar',
        [Country.MW]: 'Malawi',
        [Country.MY]: 'Malaysia',
        [Country.MV]: 'Maldives',
        [Country.ML]: 'Mali',
        [Country.MT]: 'Malta',
        [Country.MH]: 'Marshall Islands',
        [Country.MQ]: 'Martinique',
        [Country.MR]: 'Mauritania',
        [Country.MU]: 'Mauritius',
        [Country.YT]: 'Mayotte',
        [Country.MX]: 'Mexico',
        [Country.FM]: 'Micronesia',
        [Country.MD]: 'Moldova',
        [Country.MC]: 'Monaco',
        [Country.MN]: 'Mongolia',
        [Country.ME]: 'Montenegro',
        [Country.MS]: 'Montserrat',
        [Country.MA]: 'Morocco',
        [Country.MZ]: 'Mozambique',
        [Country.MM]: 'Myanmar',
        [Country.NA]: 'Namibia',
        [Country.NR]: 'Nauru',
        [Country.NP]: 'Nepal',
        [Country.NL]: 'Netherlands',
        [Country.NC]: 'New Caledonia',
        [Country.NZ]: 'New Zealand',
        [Country.NI]: 'Nicaragua',
        [Country.NE]: 'Niger',
        [Country.NG]: 'Nigeria',
        [Country.NU]: 'Niue',
        [Country.NF]: 'Norfolk Island',
        [Country.MK]: 'North Macedonia',
        [Country.MP]: 'Northern Mariana Islands',
        [Country.NO]: 'Norway',
        [Country.OM]: 'Oman',
        [Country.PK]: 'Pakistan',
        [Country.PW]: 'Palau',
        [Country.PS]: 'Palestine',
        [Country.PA]: 'Panama',
        [Country.PG]: 'Papua New Guinea',
        [Country.PY]: 'Paraguay',
        [Country.PE]: 'Peru',
        [Country.PH]: 'Philippines',
        [Country.PN]: 'Pitcairn',
        [Country.PL]: 'Poland',
        [Country.PT]: 'Portugal',
        [Country.PR]: 'Puerto Rico',
        [Country.QA]: 'Qatar',
        [Country.RE]: 'Réunion',
        [Country.RO]: 'Romania',
        [Country.RU]: 'Russia',
        [Country.RW]: 'Rwanda',
        [Country.BL]: 'Saint Barthélemy',
        [Country.SH]: 'Saint Helena',
        [Country.KN]: 'Saint Kitts and Nevis',
        [Country.LC]: 'Saint Lucia',
        [Country.MF]: 'Saint Martin',
        [Country.PM]: 'Saint Pierre and Miquelon',
        [Country.VC]: 'Saint Vincent and the Grenadines',
        [Country.WS]: 'Samoa',
        [Country.SM]: 'San Marino',
        [Country.ST]: 'Sao Tome and Principe',
        [Country.SA]: 'Saudi Arabia',
        [Country.SN]: 'Senegal',
        [Country.RS]: 'Serbia',
        [Country.SC]: 'Seychelles',
        [Country.SL]: 'Sierra Leone',
        [Country.SG]: 'Singapore',
        [Country.SX]: 'Sint Maarten',
        [Country.SK]: 'Slovakia',
        [Country.SI]: 'Slovenia',
        [Country.SB]: 'Solomon Islands',
        [Country.SO]: 'Somalia',
        [Country.ZA]: 'South Africa',
        [Country.GS]: 'South Georgia and South Sandwich Islands',
        [Country.SS]: 'South Sudan',
        [Country.ES]: 'Spain',
        [Country.LK]: 'Sri Lanka',
        [Country.SD]: 'Sudan',
        [Country.SR]: 'Suriname',
        [Country.SJ]: 'Svalbard and Jan Mayen',
        [Country.SE]: 'Sweden',
        [Country.CH]: 'Switzerland',
        [Country.SY]: 'Syria',
        [Country.TW]: 'Taiwan',
        [Country.TJ]: 'Tajikistan',
        [Country.TZ]: 'Tanzania',
        [Country.TH]: 'Thailand',
        [Country.TL]: 'Timor-Leste',
        [Country.TG]: 'Togo',
        [Country.TK]: 'Tokelau',
        [Country.TO]: 'Tonga',
        [Country.TT]: 'Trinidad and Tobago',
        [Country.TN]: 'Tunisia',
        [Country.TR]: 'Turkey',
        [Country.TM]: 'Turkmenistan',
        [Country.TC]: 'Turks and Caicos Islands',
        [Country.TV]: 'Tuvalu',
        [Country.UG]: 'Uganda',
        [Country.UA]: 'Ukraine',
        [Country.AE]: 'United Arab Emirates',
        [Country.GB]: 'United Kingdom',
        [Country.US]: 'United States',
        [Country.UM]: 'United States Minor Outlying Islands',
        [Country.UY]: 'Uruguay',
        [Country.UZ]: 'Uzbekistan',
        [Country.VU]: 'Vanuatu',
        [Country.VE]: 'Venezuela',
        [Country.VN]: 'Vietnam',
        [Country.VG]: 'Virgin Islands (British)',
        [Country.VI]: 'Virgin Islands (U.S.)',
        [Country.WF]: 'Wallis and Futuna',
        [Country.EH]: 'Western Sahara',
        [Country.YE]: 'Yemen',
        [Country.ZM]: 'Zambia',
        [Country.ZW]: 'Zimbabwe'
    };
    return countryNames[code] || code.toString();
} 