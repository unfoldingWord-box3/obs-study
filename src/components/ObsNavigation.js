import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import { rangeArray, pad } from '../utils/obj-functions'
import { obsHierarchy, obsTitles, obsNbrPictures } from '../constants/obsHierarchy'
import useBrowserData from '../hooks/useBrowserData'
import { bibleData } from '../constants/bibleData'

const SerieGridBar = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { classes, title, subtitle } = props
  return (
      <ImageListItemBar
        title={title}
        subtitle={subtitle}
      />
  )
}

const OBSNavigation = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { size, largeScreen } = useBrowserData()
  // const { curPlay } = useMediaPlayer()
  const { onExitNavigation, onStartPlay } = props
  // const curSerie = (curPlay!=null) ? curPlay.curSerie : undefined
  const curSerie = bibleData
  const [curLevel, setCurLevel] = useState(1)
  const [level1, setLevel1] = useState(1)
  const [level2, setLevel2] = useState("")
  // ToDo !!! find a bibleBookList and use this here
  // eslint-disable-next-line no-unused-vars
  const [curList,setCurList] = useState((curSerie!=null) ? curSerie.bibleBookList : [])

  // eslint-disable-next-line no-unused-vars
  const handleClick = (ev,id,_isBookIcon) => {
    if (curLevel===1){
      setLevel1(id)
      setCurLevel(2)
    } else if (curLevel===2){
      const bookObj = {}
      const curSerie = {}
      onStartPlay(curSerie,bookObj,id)
      setLevel2(id)
    } else {
      // const bookObj = naviChapters[level1][level2][level3]
      // // const {curSerie} = curPlay
      // onStartPlay(curSerie,bookObj,id)
    }
  }

  const navigateUp = (level) => {
    if (level===0){
      onExitNavigation()
    } else {
      setCurLevel(level)
    }
  }

  const handleReturn = () => {
    if (curLevel>2){
      navigateUp(2)
    } else
    if (curLevel>1){
      navigateUp(curLevel-1)
    } else {
      onExitNavigation()
    }
  }

  let validIconList = []
  if (curLevel===1){
    obsHierarchy.map((obj,iconInx) => {
      const curIconObj = {
        key: iconInx,
        imgSrc: `/navIcons/${obj.img}`,
        title: obj.title,
        // subtitle: "test",
        isBookIcon: false
      }
      validIconList.push(curIconObj)
    })
  }
  if (curLevel===2){
    const curObj = obsHierarchy[level1]
    const beg = curObj.beg
    const end = beg + curObj.count -1
    rangeArray(beg,end).forEach(inx => {
      const curIconObj = {
        key: inx,
        imgSrc: `/obsIcons/obs-en-${pad(inx)}-01.jpg`,
        title: obsTitles[inx-1],
        // subtitle: "test",
        isBookIcon: false
      }
      validIconList.push(curIconObj)
    })
  }
  if (curLevel===3){
    const beg = 1
    const end = beg + obsNbrPictures[level2-1] -1
    rangeArray(beg,end).forEach(inx => {
      const curIconObj = {
        key: inx,
        imgSrc: `/obsIcons/obs-en-${pad(level2)}-${pad(inx)}.jpg`,
        // title: obsTitles[inx],
        // subtitle: "test",
        isBookIcon: false
      }
      validIconList.push(curIconObj)
    })
    // obsTitles
  }

  let useCols = 3
  if (size==="xs") useCols = 2
  else if (size==="lg") useCols = 4
  else if (size==="xl") useCols = 5
  const rootLevel = (curLevel===1)
  return (
    <div>
      {!rootLevel && (
        <Fab
          onClick={handleReturn}
          // className={largeScreen ? classes.exitButtonLS : classes.exitButton}
          color="primary"
        >
          <ChevronLeft />
        </Fab>
      )}
      <Typography
        type="title"
      >OBS Navigation</Typography>
      <ImageList
        rowHeight="auto"
        cols={useCols}
      >
      {validIconList.map(iconObj => {
        const {key,imgSrc,title,subtitle,isBookIcon} = iconObj
        return (
          <ImageListItem
            onClick={(ev) => handleClick(ev,key,isBookIcon)}
            key={key}
          >
            <img
              src={imgSrc}
              alt={title}/>
            <SerieGridBar
              title={title}
              subtitle={subtitle}
            />
          </ImageListItem>
        )
      })}
      </ImageList>
    </div>
  )
}

export default OBSNavigation
