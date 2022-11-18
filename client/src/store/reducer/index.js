import { 
    GET_COUNTRYS,
    GET_COUNTRY_NAME,
    GET_COUNTRY_ID,
    ADD_ACTIVITIES,
    ORDER_NAME,
    FILTER_POR_CONTINENTES,
    GET_ACTIVITIES,
    FILTER_POR_ACTIVITIES,
    ORDER_POR_POBLACION,
} from "../actions/actions_type";



const initialState ={
    countries:[],
    countriesId:[],
    allCountries :[],
    allActivities:[]
}

function rootReducer(state = initialState,action){
    switch(action.type){

        case GET_COUNTRYS:
            return{
                ...state,
                countries: action.payload,
                allCountries : action.payload
            };

        case ORDER_NAME:
            let ordenarbro = action.payload ==="asc"?
            state.countries.sort(function(a,b){
                if(a.name >b.name){
                    return 1;
                }
                if(b.name>a.name){
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function(a,b){
                if(a.name >b.name){
                    return -1;
                }
                if(b.name>a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                countries: ordenarbro
            };

        case ORDER_POR_POBLACION:
            let orderxPoblacion= action.payload ==="Menor"?
            state.countries.sort(function(a,b){
                if(a.poblacion > b.poblacion){
                    return 1;
                }
                if(b.poblacion > a.poblacion){
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function(a,b){
                if(a.poblacion >b.poblacion){
                    return -1;
                }
                if(b.poblacion>a.poblacion){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                countries:orderxPoblacion
            }

        case ADD_ACTIVITIES:
            return{
                ...state
            }

        case GET_COUNTRY_ID:
            return{
                ...state,
                countriesId: action.payload
            }

        case GET_COUNTRY_NAME :
            return{
               ...state,
               countries:action.payload
            }

        case FILTER_POR_CONTINENTES:
            const todosloscountries = state.allCountries
            const filtrados = action.payload === "All"? todosloscountries : todosloscountries.filter(el => el.continentes === action.payload)
            return{
                ...state,
                countries: filtrados
            }

        case  GET_ACTIVITIES:
            return{
                ...state,
                allActivities: action.payload
            };

        case FILTER_POR_ACTIVITIES:
                let filterAct;
                if (action.payload === "All") {
                    filterAct = state.allCountries;
                } else {
                     filterAct = state.allCountries.filter(e => e.sightseeings.length && e.sightseeings.map(c => c.name).includes(action.payload))
                }
                return {
                    ...state,
                    countries: filterAct
                }
        
                
        default : 
            return state;   
    }
};

export default rootReducer;


//    [...state.allActivities,action.payload] 