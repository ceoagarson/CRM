import React, { useEffect, useContext, useState, useCallback } from "react";
import { Background, BackgroundVariant, Connection, Controls, MiniMap, Node, Panel, ReactFlow, addEdge, useNodesState, useEdgesState, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from 'uuid';
import { MenuNode, DefaultNode, CommonNode, StartNode, OutputNode } from "../../nodes/NodeTypes"
import UpdateNodeModal from "./UpdateNodeDialog";
import SaveUpdateFlowModal from "./SaveUpdateFlowDialog";
import { BotChoiceActions, ChoiceContext } from "../../../contexts/dialogContext";
import { IFlow } from "../../../types/bot/flow.types";
import { Box, Dialog, Stack } from "@mui/material";
import { useBotFields } from "../../hooks/BotFieldsHook";

const nodeTypes = { MenuNode, DefaultNode, StartNode, OutputNode, CommonNode }

function UpdateFlowDialog({ selectedFlow }: { selectedFlow: IFlow }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [flow, setFlow] = useState<IFlow | undefined>()
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState<Node>()
    const [displayUpdateModal, setDisplayUpdateModal] = useState(false)
    const [displayNodeUpdateModal, setDisplayNodeUpdateModal] = useState(false)
    const { readonlyFields } = useBotFields()
    function handleSingleClick(event: React.MouseEvent, _node: Node) {
        setSelectedNode(_node)
        return event
    }
    function handleDoubleClick(event: React.MouseEvent, _node: Node) {
        if (selectedNode) {
            setDisplayNodeUpdateModal(true)
        }
        return event
    }

    function handleEdgeDelete(event: React.MouseEvent, _edge: Edge) {
        let is_deletable = true
        let parentNode = nodes.find((node) => node.id === _edge.source)
        let targetNode = nodes.find((node) => node.id === _edge.target)
        if (_edge.source === "start")
            is_deletable = false
        else if (parentNode?.type === "MenuNode")
            is_deletable = false
        if (is_deletable) {
            setNodes((nodes) => nodes.map((node) => {
                if (node.id === targetNode?.id) {
                    node.parentNode = undefined
                }
                return node
            }))
            setEdges(edges.filter((edge) => {
                return edge.id !== _edge.id
            }))
        }
        return event
    }
    //handle nodes
    const onConnect = useCallback((params: Connection) => setEdges((eds) => {
        let srcNode = nodes.find(node => node.id === params.source)
        let targetNode = nodes.find(node => node.id === params.target)

        if (srcNode && targetNode) {
            if (srcNode.type === "CommonNode") {
                setNodes((nodes) => nodes.map((node) => {
                    if (node.id === targetNode?.id) {
                        node.type = "MenuNode"
                        node.parentNode = srcNode?.id
                        node.position = {
                            x: selectedNode ? selectedNode.position.x : 0,
                            y: selectedNode ? selectedNode.position.y + 50 : 100
                        }
                        node.data = {
                            ...node.data,
                            media_type: "message",
                        }
                    }
                    return node
                }))
            }


            if (srcNode.type === "MenuNode") {
                let length = nodes.filter((node) => { return node.parentNode === srcNode?.id }).length
                setNodes((nodes) => nodes.map((node) => {
                    if (node.id === targetNode?.id) {
                        node.type = "DefaultNode"
                        node.parentNode = srcNode?.id
                        node.position = {
                            x: selectedNode ? selectedNode.position.x : 0,
                            y: selectedNode ? selectedNode.position.y + 50 : 100
                        }
                        node.data = {
                            ...node.data,
                            index: length ? length + 1 : 1,
                            media_type: "message",
                        }
                    }
                    return node
                }))
            }

            if (srcNode.type === "DefaultNode" && targetNode.type === "DefaultNode") {
                setNodes((nodes) => nodes.map((node) => {
                    if (node.id === targetNode?.id) {
                        node.type = "MenuNode"
                        node.parentNode = srcNode?.id
                        node.position = {
                            x: selectedNode ? selectedNode.position.x : 0,
                            y: selectedNode ? selectedNode.position.y + 50 : 100
                        }
                        node.data = {
                            ...node.data,
                            media_type: "message",
                        }
                    }
                    return node
                }))
            }
            if (srcNode.type === "DefaultNode" && targetNode.type === "MenuNode") {
                setNodes((nodes) => nodes.map((node) => {
                    if (node.id === targetNode?.id) {
                        node.parentNode = srcNode?.id
                        node.position = {
                            x: selectedNode ? selectedNode.position.x : 0,
                            y: selectedNode ? selectedNode.position.y + 20 : 30
                        }
                        node.data = {
                            ...node.data,
                            media_type: "message",
                        }
                    }
                    return node
                }))
            }
            if (srcNode.type === "DefaultNode" && targetNode.type === "OutputNode") {
                let length = nodes.filter((node) => { return node.parentNode === srcNode?.id }).length
                setNodes((nodes) => nodes.map((node) => {
                    if (node.id === targetNode?.id) {
                        node.parentNode = srcNode?.id
                        node.position = {
                            x: selectedNode ? selectedNode.position.x : 0,
                            y: selectedNode ? selectedNode.position.y + 50 : 100
                        }
                        node.data = {
                            ...node.data,
                            media_type: "message",
                            index: length ? length + 1 : 1,
                        }
                    }
                    return node
                }))
            }
        }
        return addEdge(params, eds)
    }), [nodes, setNodes, selectedNode, setEdges]);

    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        if (event && event.dataTransfer) {
            const type = event?.dataTransfer.getData('application/reactflow');
            const newNode: Node = {
                id: uuidv4(),
                type,
                position: {
                    x: selectedNode ? selectedNode.position.x : 0,
                    y: selectedNode ? selectedNode.position.y + 50 : 100
                },
                data: { media_type: "message", media_value: "default" }
            };
            setNodes((nds) => nds.concat(newNode));
        }
    };

    const onDragStart = (event: DragEvent, nodeType: string) => {
        if (event && event.dataTransfer) {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        if (event && event.dataTransfer)
            event.dataTransfer.dropEffect = 'move';
    };

    const UpdateNode = (index: number, media_value: string, media_type?: string) => {
        if (selectedNode) {
            setNodes((nodes) => nodes.map((node) => {
                if (node.id === selectedNode.id) {
                    node.data = {
                        ...node.data,
                        index: index,
                        media_value,
                        media_type,
                    }
                }
                if (node.id === "start") {
                    if (flow)
                        setFlow({
                            ...flow,
                            trigger_keywords: node.data.media_value
                        })
                }
                return node
            }))
        }

    }
    const handleNewNodeONClick = (type: string) => {
        const newNode: Node = {
            id: uuidv4(),
            type,
            position: {
                x: selectedNode ? selectedNode.position.x : 0,
                y: selectedNode ? selectedNode.position.y + 50 : 100
            },
            data: { media_type: "message", media_value: "default" }
        };
        setNodes((nds) => nds.concat(newNode));
    }
    useEffect(() => {
        if (selectedFlow) {
            setFlow(selectedFlow)
            setNodes(selectedFlow.nodes)
            setEdges(selectedFlow.edges)
        }
    }, [selectedFlow, setNodes, setEdges, setFlow])

    return (

        <Dialog fullScreen open={choice === BotChoiceActions.update_flow ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
        >
            <div style={{ height: "100vh" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    fitView
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onNodeClick={handleSingleClick}
                    onNodeDoubleClick={handleDoubleClick}
                    onEdgeDoubleClick={handleEdgeDelete}
                    defaultEdgeOptions={{ animated: true, interactionWidth: 50 }}
                    //@ts-ignore
                    onDrop={onDrop}
                    //@ts-ignore

                    onDragOver={onDragOver}
                >
                    <Background variant={BackgroundVariant.Dots} />
                    <MiniMap pannable={true} nodeStrokeWidth={5}
                        zoomable={true} nodeColor="grey" />

                    <Controls position="top-left" showInteractive={readonlyFields?.includes('allow_edit_flow')} />
                    <Panel position="top-right" >
                        {/* @ts-ignore */}

                        <Box sx={{
                            cursor: "pointer", maxWidth: 100, backgroundColor: 'whitesmoke', border: 1, borderRadius: 1, p: 1, marginBottom: 1
                        }}
                            onDragStart={(event: DragEvent) => onDragStart(event, 'DefaultNode')} draggable
                            onDoubleClick={() => handleNewNodeONClick("DefaultNode")}
                        >
                            <Stack direction="row" alignItems="center" gap={1}
                            >
                                <img width="20" height="20" src="https://img.icons8.com/arcade/64/box.png" alt="undo" />
                                <span>Default</span>
                            </Stack>
                        </Box>


                        {/* @ts-ignore */}
                        <Box sx={{
                            cursor: "pointer", maxWidth: 100, backgroundColor: 'lightgreen', border: 1, borderRadius: 1, p: 1, marginBottom: 1
                        }}

                            onDragStart={(event: DragEvent) => onDragStart(event, 'OutputNode')}
                            draggable
                            onDoubleClick={() => handleNewNodeONClick("OutputNode")}
                        >
                            <Stack direction="row" alignItems="center" gap={1}
                            >
                                <img width="20" height="20" src="https://img.icons8.com/arcade/64/box.png" alt="undo" />
                                <span>Reply</span>
                            </Stack>
                        </Box>

                        <Box sx={{
                            cursor: "pointer", maxWidth: 100, backgroundColor: 'lightblue', border: 1, borderRadius: 1, p: 1, marginBottom: 1
                        }}>
                            <Stack direction="row" alignItems="center" gap={1}
                                onClick={() => {
                                    if (flow) {
                                        setDisplayUpdateModal(true)
                                        setFlow({ ...flow, nodes: nodes, edges: edges })
                                    }
                                }
                                }
                            >
                                <img width="20" height="20" src="https://img.icons8.com/color/48/save--v1.png" alt="close" />
                                <span >Save</span>
                            </Stack>
                        </Box>
                        <Box sx={{
                            cursor: "pointer", maxWidth: 100, backgroundColor: 'whitesmoke', border: 1, borderRadius: 1, p: 1, marginBottom: 1
                        }}>
                            <Stack direction="row" alignItems="center" gap={1}
                                onClick={() => {
                                    setChoice({ type: BotChoiceActions.close_bot })
                                    setFlow(undefined)
                                }}
                            >
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="close" />
                                <span >Close</span>
                            </Stack>
                        </Box>
                        <Box sx={{
                            cursor: "pointer", maxWidth: 100, backgroundColor: '#FFCCCB', border: 1, borderRadius: 1, p: 1, marginBottom: 1
                        }}>
                            <Stack direction="row" alignItems="center" gap={1}
                                onClick={() => {
                                    setFlow(selectedFlow)
                                    setNodes(selectedFlow.nodes)
                                    setEdges(selectedFlow.edges)
                                }}
                            >
                                <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/update-left-rotation.png" alt="close" />
                                <span>Reset</span>
                            </Stack>
                        </Box>
                    </Panel>
                </ReactFlow >
                {selectedNode ? <UpdateNodeModal updateNode={UpdateNode} selectedNode={selectedNode} setDisplayNodeUpdateModal={setDisplayNodeUpdateModal} displayNodeUpdateModal={displayNodeUpdateModal} /> : null}
                {displayUpdateModal && flow ? <SaveUpdateFlowModal flow={flow} setDisplayUpdateModal={setDisplayUpdateModal} displayUpdateModal={displayUpdateModal} /> : null}
            </div>
        </Dialog>
    )
}

export default UpdateFlowDialog