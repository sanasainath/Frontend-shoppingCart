import { addressConstants } from "../action/constants";
const initialState={
  address:[],
  orders:[],
  adminOrders: [],
  isOrderFetching:false,
  loading:false,
  selectedAddress: null, 
  
}
const addressreducer= (state=initialState,action)=>{

switch(action.type)
{
    case addressConstants.ADD_USER_ADDRESS_REQUEST:
        return{
            ...state,
            loading:true,
        };
    case addressConstants.ADD_USER_ADDRESS_SUCCESS:
        return {
            ...state,
            address:action.payload.address,
            loading:true,
           
        };

    case addressConstants.ADD_USER_ADDRESS_FAILURE:
        return {
            ...state,
            loading:false,
        }
    case addressConstants.GET_USER_ADDRESS_REQUEST:
        return{
            ...state,
            loading:true,
        }
    case addressConstants.GET_USER_ADDRESS_SUCCESS:
        return{
           ...state,
           address: action.payload.address,
           loading:false,
        }
    case addressConstants.GET_USER_ADDRESS_FAILURE:
        return {
            ...state,
            loading:false,
        }
        case addressConstants.SET_SELECTED_ADDRESS:
            return {
              ...state,
              selectedAddress: action.payload,
            };
       case addressConstants.UPDATE_USER_ADDRESS_REQUEST:
                return {
                  ...state,
                  loading: true,
                };
          
        case addressConstants.UPDATE_USER_ADDRESS_SUCCESS:
                return {
                  ...state,
                  address: action.payload.address,
                  loading: false,
                };
          
        case addressConstants.UPDATE_USER_ADDRESS_FAILURE:
                return {
                  ...state,
                  loading: false,
                };
                case addressConstants.GET_ORDER_REQUEST:
                    return {
                      ...state,
                      isOrderFetching: true,
                    };
                  
              
      case addressConstants.GET_ORDER_SUCCESS:
        return{
            ...state,
            orders:action.payload.orders,
            isOrderFetching:false,
            
        }
        case addressConstants.GET_ADMIN_ORDER_REQUEST:
            return {
              ...state,
              loading: true,
            };
            case addressConstants.GET_ADMIN_ORDER_SUCCESS: {
                const allOrdersArray = Object.values(action.payload.allOrders);
                console.log("in reducer ",allOrdersArray)
                return {
                  ...state,
                  adminOrders: allOrdersArray,
                  loading: false,
                };
              }
              
          case addressConstants.GET_ADMIN_ORDER_FAILURE: {
            return {
              ...state,
              loading: false,
            };
          }
          

    default:
        return state;
}
}

export default addressreducer;