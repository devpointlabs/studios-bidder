import React from 'react';
import axios from 'axios';
export const HistoryContext = React.createContext();
export const HistoryConsumer = HistoryContext.Consumer;
export class HistoryProvider extends React.Component {
  state = { 
    featuresFromHistory: [],
    categoriesFromHistory: [],
    featuresWArchive: [],
    catagoriesWArchive: [],
    featureIDsFromHistory: [],
    categoryIDsFromHistory: [],
    // fullEstimates: [],
  }
  // handleHistoryIDs = () => {
  //   debugger
  //   const {featuresWArchive, catagoriesWArchive, featureIDsFromHistory, featuresFromHistory, categoriesFromHistory} = this.state;
  //   axios.get(`/api/all_categories`)
  //     .then( res  => 
  //       this.setState({catagoriesWArchive: [...res.data]}))
    
  //   axios.get(`/api/all_features`)
  //     .then(res => this.setState({featuresWArchive: [...res.data]}))
  //   featureIDsFromHistory.map(fe => {
  //     const finalFeatures = featuresWArchive.filter(f => f.id === fe)
  //     featuresFromHistory.push(...finalFeatures)
  //     this.setState({featuresFromHistory})
  //   })
  //   featuresFromHistory.map(f => {
  //     const finalCategories = catagoriesWArchive.filter(c => c.id === f.category_id)
  //     console.log(finalCategories)
  //     categoriesFromHistory.push(...finalCategories)
  //     this.setState({categoriesFromHistory})
  //   })
  // }
  
  handleEstimate = (ID) => {
    // debugger 
    const {featureIDsFromHistory, categoryIDsFromHistory, featuresFromHistory} = this.state;
    axios.get(`/api/featureIDs_from_estimate/${ID}`)
      .then( res  => { 
        const arr1 = []
        const arr2 = []
        arr1.push(...res.data)
        arr1.map(fe => arr2.push(fe.feature_id))
        this.setState({featureIDsFromHistory: [...new Set(arr2)]})
        console.log(featureIDsFromHistory)
      }).then(axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
                    .then(res => this.setState({featuresFromHistory: [...res.data]}))
                    //////////////////////////////////////// split this here to new 
                    .then(featuresFromHistory.map(f => categoryIDsFromHistory.push(f.category_id)))
                    .then(axios.get(`/api/categories_by_id/${categoryIDsFromHistory}`))
                    .then(res => {console.log([...res.data])})
              )
                    // .then(res => this.setState({categoriesFromHistory: [...res.data]})))
    // this.handleHistoryIDs()
    // this.estimateIDtoSQL()
  }
  
  estimateIDtoSQL = () => {
    const { featureIDsFromHistory, featuresFromHistory, categoryIDsFromHistory } = this.state
    // debugger
    axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
      .then(res => this.setState({featuresFromHistory: [...res.data]}))
      .then(featuresFromHistory.map(f => categoryIDsFromHistory.push(f.category_id)))
      .then(axios.get(`/api/categories_by_id/${categoryIDsFromHistory}`))
      .then(res => this.setState({categoriesFromHistory: [...res.data]}))
  }
  // handleEstimates = () => {
  //   const {fullEstimates} = this.state;
  //   this.setState({fullEstimates: []})
  //   axios.get(`/api/estimates`)
  //     .then(res => fullEstimates.push(...res.data))
  //     .then(this.setState({fullEstimates}))
  //   // console.log(fullEstimates)
  // }
  // handleHistoryCategories = (categories) => {
  //   const {categoriesFromHistory} = this.state;
  //   this.setState({categoriesFromHistory: [...categories]});
  //   categories.map( c => { 
  //     const {iosCategories, webCategories, androidCategories} = this.state;
  //     if (c.platform_id === 1) {
  //       this.setState({iosCategories: [...iosCategories, c]})};
  //     if (c.platform_id === 2) {
  //       this.setState({androidCategories: [...androidCategories, c]})};
  //     if (c.platform_id === 3) {
  //       this.setState({webCategories: [...webCategories, c]})};
  //   }) 
  // };
  dumpHistory = () => {
    this.setState({
      featuresFromHistory: [],
      categoriesFromHistory: [],
      featuresWArchive: [],
      catagoriesWArchive: [],
    })
  }
  render() {
    
    return (
      <HistoryContext.Provider value={{
       ...this.state,
       dumpHistory: this.dumpHistory,
       handleEstimate: this.handleEstimate,
       handleEstimates: this.handleEstimates,
       handleHistoryIDs: this.handleHistoryIDs,
       estimateIDtoSQL: this.estimateIDtoSQL,
      }}>
      {this.props.children}
    </HistoryContext.Provider>
  );
};
};




//   handleHistoryIDs = () => {
//     debugger
//     const {featuresWArchive, catagoriesWArchive, featureIDsFromHistory, featuresFromHistory, categoriesFromHistory} = this.state;
//     axios.get(`/api/all_categories`)
//       .then( res  => 
//         this.setState({catagoriesWArchive: [...res.data]}))
    
//     axios.get(`/api/all_features`)
//       .then(res => this.setState({featuresWArchive: [...res.data]}))

//     featureIDsFromHistory.map(fe => {
//       const finalFeatures = featuresWArchive.filter(f => f.id === fe)
//       featuresFromHistory.push(...finalFeatures)
//       this.setState({featuresFromHistory})
//     })

//     featuresFromHistory.map(f => {
//       const finalCategories = catagoriesWArchive.filter(c => c.id === f.category_id)
//       console.log(finalCategories)
//       categoriesFromHistory.push(...finalCategories)
//       this.setState({categoriesFromHistory})
//     })
//   }

//   handleEstimate = (ID) => {
//     debugger 
//     const {featureIDsFromHistory} = this.state;
//     axios.get(`/api/featureIDs_from_estimate/${ID}`)
//       .then( res  => { 
//         const arr1 = []
//         const arr2 = []
//         arr1.push(...res.data)
//         arr1.map(fe => arr2.push(fe.feature_id))
//         this.setState({featureIDsFromHistory: [...new Set(arr2)]})
//       });
//     this.handleHistoryIDs()
//   }

//   handleEstimates = () => {
//     const {fullEstimates} = this.state;
//     this.setState({fullEstimates: []})
//     axios.get(`/api/estimates`)
//       .then(res => fullEstimates.push(...res.data))
//       .then(this.setState({fullEstimates}))
//     // console.log(fullEstimates)
//   }

//   handleHistoryCategories = (categories) => {
//     const {categoriesFromHistory} = this.state;
//     this.setState({categoriesFromHistory: [...categories]});
//     categories.map( c => { 
//       const {iosCategories, webCategories, androidCategories} = this.state;
//       if (c.platform_id === 1) {
//         this.setState({iosCategories: [...iosCategories, c]})};
//       if (c.platform_id === 2) {
//         this.setState({androidCategories: [...androidCategories, c]})};
//       if (c.platform_id === 3) {
//         this.setState({webCategories: [...webCategories, c]})};
//     }) 
//   };

//   dumpHistory = () => {
//     this.setState({
//       featuresFromHistory: [],
//       categoriesFromHistory: [],
//       featuresWArchive: [],
//       catagoriesWArchive: [],
//     })
//   }

//   render() {
    
//     return (
//       <HistoryContext.Provider value={{
//        ...this.state,
//        dumpHistory: this.dumpHistory,
//        handleEstimate: this.handleEstimate,
//        handleEstimates: this.handleEstimates,
//        handleHistoryIDs: this.handleHistoryIDs,
//       }}>
//       {this.props.children}
//     </HistoryContext.Provider>
//   );
// };
// };