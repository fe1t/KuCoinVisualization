import React from 'react'
import { Group } from '@vx/group'
import { Tree } from '@vx/hierarchy'
import { LinkHorizontal } from '@vx/shape'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from '@vx/gradient'

const Node = mouseOverCallback => ({ node, events }) => {
  const width = 40
  const height = 20
  return (
    <Group top={node.x} left={node.y}>
      {node.depth === 0 && (
        <circle
          r={12}
          fill="url('#lg')"
          onMouseOver={event => mouseOverCallback(event, node)}
          onMouseLeave={event => mouseOverCallback(event, undefined)}
        />
      )}
      {node.depth !== 0 && (
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={'#272b4d'}
          stroke={node.children ? '#03c0dc' : '#26deb0'}
          strokeWidth={1}
          strokeDasharray={!node.children ? '2,2' : '0'}
          strokeOpacity={!node.children ? 0.6 : 1}
          rx={!node.children ? 10 : 0}
          onMouseOver={event => mouseOverCallback(event, node)}
          onMouseLeave={event => mouseOverCallback(event, undefined)}
        />
      )}
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}
      >
        {node.data.name}
      </text>
    </Group>
  )
}

function Link({ link }) {
  return <LinkHorizontal data={link} stroke="#374469" strokeWidth="1" fill="none" />
}

export default ({
  width,
  height,
  raw,
  events = false,
  margin = {
    top: 10,
    left: 30,
    right: 40,
    bottom: 80
  },
  mouseOverCallback
}) => {
  const data = hierarchy(raw)
  if (width < 10) return null
  return (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
      <rect width={width} height={height} rx={14} fill="#272b4d" />
      <Tree
        top={margin.top}
        left={margin.left}
        root={data}
        size={[height - margin.top - margin.bottom, width - margin.left - margin.right]}
        nodeComponent={Node(mouseOverCallback)}
        linkComponent={Link}
      />
    </svg>
  )
}
