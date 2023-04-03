// import React from 'react'
// import { Button, Container, Checkbox, Grid, Modal } from 'semantic-ui-react'
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href =
//     "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);
// function exampleReducer(state, action) {
//     switch (action.type) {
//         case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
//             return { ...state, closeOnDimmerClick: action.value }
//         case 'CONFIG_CLOSE_ON_ESCAPE':
//             return { ...state, closeOnEscape: action.value }
//         case 'OPEN_MODAL':
//             return { ...state, open: true }
//         case 'CLOSE_MODAL':
//             return { ...state, open: false }
//         default:
//             throw new Error()
//     }
// }


// function Temp() {
//     const [state, dispatch] = React.useReducer(exampleReducer, {
//         closeOnEscape: false,
//         closeOnDimmerClick: false,
//         open: false,
//         dimmer: undefined,
//     })
//     const { open, closeOnEscape, closeOnDimmerClick } = state

//     return (
//         <Container className='m-10'>
//             <Grid columns={2}>
//                 <Grid.Column>
//                     {/* <Checkbox
//                         checked={closeOnEscape}
//                         label={{ children: <code>closeOnEscape</code> }}
//                         onChange={(e, { checked }) =>
//                             dispatch({ type: 'CONFIG_CLOSE_ON_ESCAPE', value: checked })
//                         }
//                     />
//                     <br />
//                     <Checkbox
//                         checked={closeOnDimmerClick}
//                         label={{ children: <code>closeOnDimmerClick</code> }}
//                         onChange={(e, { checked }) =>
//                             dispatch({ type: 'CONFIG_CLOSE_ON_DIMMER_CLICK', value: checked })
//                         }
//                     /> */}
//                 </Grid.Column>

//                 <Grid.Column className='m-100'>
//                     <Modal
//                         closeOnEscape={closeOnEscape}
//                         closeOnDimmerClick={closeOnDimmerClick}
//                         open={open}
//                         onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
//                         onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
//                         trigger={<Button>Show Modal</Button>}
//                     >
//                         <Modal.Header>Delete Your Account</Modal.Header>
//                         <Modal.Content>
//                             <p>Are you sure you want to delete your account</p>
//                         </Modal.Content>
//                         <Modal.Actions>
//                             <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>
//                                 No
//                             </Button>
//                             <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} positive>
//                                 Yes
//                             </Button>
//                         </Modal.Actions>
//                     </Modal>
//                 </Grid.Column>
//             </Grid>
//         </Container>
//     )
// }

// export default Temp;