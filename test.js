<Scene key = "tabBar" tabs lazy tabBarPosition={'bottom'} labelStyle={styles.labelStyle} tabBarStyle={styles.tabBar} onRight={null} rightButtonImage={null} >
          <Scene key= "ActivityNotesWrapper" hideNavBar title= "Notes" initial >
             <Scene key="notes" title="Activity Notes" component={ActivityNotes} onRight={ ()=> Actions.pop() } rightButtonImage={require('./src/components/img/plus.png')} hideNavBar={false} navigationBarStyle={{ ...Platform.select({ android: { marginTop: Constants.statusBarHeight }, }), }} back onBack={() => Actions.pop()} >
             </Scene>
          </Scene>
          <Scene key= "ActivityDetailsWrapper" hideNavBar title= "Details" >
            <Scene key="activitiyDetail" title={'Activity Detail'} hideNavBar={false} component={ActivityDetailScreen} navigationBarStyle={{ ...Platform.select({ android: { marginTop: Constants.statusBarHeight }, }), }} back leftTitle="Back" onBack={() => Actions.popTo('activitiesDrawer')} >
            </Scene>
          </Scene>
            <Scene key="ActivityAssigneesWrapper" hideNavBar title="Assignees" >
              <Scene key="ActivityAssignees" title={'Activity Assignees'} hideNavBar={false} component={ActivityAssignees} navigationBarStyle={{ ...Platform.select({ android: { marginTop: Constants.statusBarHeight }, }), }} onRight={ ()=> Actions.pop() } rightButtonImage={require('./src/components/img/plus.png')} back onBack={() => Actions.popTo('activitiesDrawer')} >
              </Scene>
            </Scene>
</Scene>















<Scene key = "main" tabs = {true} hideNavBar = {true} >
   <Scene key = "feedTab" hideNavBar = {true} title = " " iconName = "Feed" icon = {TabIcon} >
     <Scene key ="home" component = {Feed} title = "Home"/>
   </Scene>

   <Scene key = "createTripTab" hideNavBar = {true} title = " " iconName = "Create Trip" icon = {TabIcon}>
     <Scene key = "createTrip" component = {CreateTrip} title = "Create Trip" />
   </Scene>

   <Scene key = "findHostTab" hideNavBar = {true} title = " " iconName = "Find Host" icon = {TabIcon} >
     <Scene key = "findHost" component = {FindHost} title = "Find Host" />
   </Scene>

   <Scene key = "profileTab" hideNavBar = {true} title = " " iconName = "Profile" icon = {TabIcon} >
     <Scene key = "profile" component = {Profile} title = "Profile" />
   </Scene>
</Scene>




### Version
Tell us which versions you are using:

- react-native-router-flux v4.0.0-beta.31
- react-native v0.55.4

### Expected behaviour
        Actions.jump('tabbar', this.props.rowData) is supposed to send props to all children of scene with key 'tabbar'

### Actual behaviour
Props is sent to first child only
below is the scene heirarchy
<Scene key="tabbar" tabs tabBarPosition='bottom'>
          <Scene key='StepList' title='Steps' icon={TabIcon} back component={StepList} iconName="list-ul"
           swipeEnabled />
            <Scene key="See Site on Map" title="See Site on Map" icon={TabIcon} back component=
           {ShowMap} iconName="map-marker" swipeEnabled />
            <Scene key='Show Documents' title="Site Documents" icon={TabIcon} back component=
            {DocumentList} iconName="file-pdf-o" swipeEnabled />
</Scene>
