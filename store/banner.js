export const state = () => ({
    selectedSlug: '',
    selectedName:'',
    categories: [
        {
            name: 'BUY',
            clicked: false,
            slug: 'SALE'
        },
        {
            name: 'RENT',
            clicked: false,
            slug: 'RENT'
        },
        {
            name: 'SHORT LET',
            clicked: false,
            slug: 'SHORT'
        },
        {
            name: 'NEW DEVELOPMENTS',
            clicked: false,
            slug: 'NEW'
        },
        {
            name: 'PAY IN INSTALLMENTS',
            clicked: false,
            slug: 'INSTALLMENT'
        }
    ],
    dropDown:{
        Type:[
        {option:'Flat Or Apartment', value: 'FLAT OR APARTMENT'},
        {option:'House', value: 'HOUSE'},
        {option:'Land', value: 'LAND'},
        {option:'Commercial Property', value: 'COMMERCIAL'}
    ],
    bedRoom:[
        {option:'1', value: '1'},
        {option:'2', value: '2'},
        {option:'3', value: '3'},
        {option:'4', value: '4'},
        {option:'5', value: '5'},
        {option:'6', value: '6'},
        {option:'7', value: '7'},
        {option:'8', value: '8'},
        {option:'9', value: '9'},
        {option:'10+', value: '10'},
    ],
    minPrice:[
        {option:'₦500,000', value: '500000'},
        {option:'₦1,000,000', value: '1000000'},
        {option:'₦2,000,000', value: '2000000'},
        {option:'₦4,000,000', value: '4000000'},
        {option:'₦6,000,000', value: '6000000'},
        {option:'₦10,000,000', value: '10000000'},
        {option:'₦20,000,000', value: '20000000'},
        {option:'₦80,000,000', value: '80000000' },
        {option:'₦100,000,000', value: '100000000'}
    ],
    maxPrice:[
        {option:'₦500,000', value: '500000'},
        {option:'₦1,000,000', value: '1000000'},
        {option:'₦2,000,000', value: '2000000'},
        {option:'₦4,000,000', value: '4000000'},
        {option:'₦6,000,000', value: '6000000'},
        {option:'₦10,000,000', value: '10000000'},
        {option:'₦20,000,000', value: '20000000'},
        {option:'₦80,000,000', value: '80000000' },
        {option:'₦100,000,000', value: '100000000'}
    ]
    },
    searchParameters:{
        type:'',
        bedroom:'',
        minprice:'',
        maxprice:'',
        Location:''
    },
    Locations:null
})

export const mutations = {
    toggleCategory (state, index){

        state.categories.forEach(element => {
            element.clicked = false
        });

        state.categories[index].clicked = true
        state.selectedSlug = state.categories[index].slug
        state.selectedName = state.categories[index].name
    
    },
    searchParameters(state , payload){
        state.searchParameters.type = payload.type
        state.searchParameters.bedroom = payload.bedroom
        state.searchParameters.minprice = payload.minprice
        state.searchParameters.maxprice = payload.maxprice
        state.searchParameters.Location = payload.Location
    },
    Location(state, payload){
        state.Location = payload
    } 
}