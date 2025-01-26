import React, { useEffect } from "react";
import TMap2 from "./TMap2.js";
import "./tm.css";

export const TreeMap = ({ treeData }) => {
    useEffect(() => {
        const tm = new TMap2.Squarified({
            rootId: "react-tree-map",
            addLeftClickHandler: true,
            addRightClickHandler: true,
            selectPathOnHover: true,
            Color: {
                enable: true,
            },
            Tips: {
                enable: true,
                offsetX: 20,
                offsetY: 20,
                onShow: function (tip, node, isLeaf, domElement) {
                    tip.innerHTML = node.tooltip;
                },
            },
            onDestroyElement: function (content, tree, isLeaf, leaf) {
                if (leaf.clearAttributes) leaf.clearAttributes();
            },
        });

        tm.loadJSON(treeData);
        return () => {};
    }, []);

    return <div id="react-tree-map" style={{ width: "100%" }}></div>;
};
