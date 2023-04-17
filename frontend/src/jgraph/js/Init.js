// urlParams is null when used for embedding
window.urlParams = window.urlParams || {};

// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;

// URLs for save and export
window.EXPORT_URL = window.EXPORT_URL || "jgraph/export";
window.SAVE_URL = window.SAVE_URL || "jgraph/save";
window.OPEN_URL = window.OPEN_URL || "jgraph/open";
window.RESOURCES_PATH = window.RESOURCES_PATH || "jgraph/resources";
window.RESOURCE_BASE =
  window.RESOURCE_BASE || window.RESOURCES_PATH + "/grapheditor";
window.STENCIL_PATH = window.STENCIL_PATH || "jgraph/stencils";
window.IMAGE_PATH = window.IMAGE_PATH || "jgraph/images";
window.STYLE_PATH = window.STYLE_PATH || "jgraph/styles";
window.CSS_PATH = window.CSS_PATH || "jgraph/styles";
window.OPEN_FORM = window.OPEN_FORM || "jgraph/open.html";

// Sets the base path, the UI language via URL param and configures the
// supported languages to avoid 404s. The loading of all core language
// resources is disabled as all required resources are in grapheditor.
// properties. Note that in this example the loading of two resource
// files (the special bundle and the default bundle) is disabled to
// save a GET request. This requires that all resources be present in
// each properties file since only one file is loaded.
window.mxBasePath = window.mxBasePath || "../../../jgraph";
window.mxLanguage = window.mxLanguage || urlParams["lang"];
window.mxLanguages = window.mxLanguages || ["de", "se"];

/**=============================================== */
/** @version Docstrail Everything below this line. */

Window.jgraphEmptyDiagramXml =
  '<mxGraphModel dx="1058" dy="906" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';

Window.jgraphChannel = {
  constant: {
    SIDEBAR_PADDING_SMALL: 10, // This is used to change the width of the left jgraph sidebar.
    SIDEBAR_PADDING_LARGE: 10, // This is used to change the width of the left jgraph sidebar.
  },
  JMode: {
    EDIT: 1,
    REVIEW: 2,
  },
  JEvent: {
    /** Yields the graph to be saved; {xml: string, name: string}. */
    SAVE: 1, // A request to save the JGraph diagram into Docstrail.
    LOAD_DIAGRAM: 2, // A request to load the diagram into Jgraph.
    MOUSE_DOWN: 3, // Mouse click down.
    MOUSE_UP: 4, // Mouse click up.
    CAPTURE_SCREENSHOT: 5, // Request to capture a JGraph screenshot.
    SVG_GENERATED: 6, // An svg has been generated from the JGraph screenshot.
    MODE_CHANGED: 7, // The Proposal View Mode has changed.
    RENAME_PROPOSAL: 8, // Rename the diagram.
    RENAME_PROPOSAL_MODAL: 9, // Open the dialog to rename the proposal from jGraph.
    AUTOSAVE_REQUEST: 10, // Request to autsave (sent to ng, expects ng to emit a save or ignore).
    DO_AUTOSAVE: 11,
  },
  _subscriberFunctions: [],
  state: {
    mode: "REVIEW",
    mouseLastDownEvent: null,
    mouseLastUpEvent: null,
    sidebarWidthPx: 60, //230, // Misnomer. This is used to offset the jgraph page towards the right.
    sidebarPaddingLeftPx: 10, // This is used to change the width of the left jgraph sidebar.
  },

  /** Contains the data from the last emit of memoized event types. */
  memoizedEmits: {
    7: undefined, //MODE_CHANGED
  },
  var: {},

  // ====== Subscription Handling.

  /** @param {(data:any)=>void} callback subscription callback that handles jGRaph data. */
  subscribe: (callback) => {
    Window.jgraphChannel._subscriberFunctions.push(callback);
    replayMemoizedEmits(callback);
  },
  clearSubsribers: () => {
    Window.jgraphChannel._subscriberFunctions = [];
  },

  // ====== Emitters.

  /**
   * @param {string} xml
   * @param {string} name */
  emitSaveGraph: (xml, name) => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.SAVE, { xml, name });
    }
  },
  /** @param {mxMouseEvent} e contains {evt:MouseEvent, graphX, graphY, RelativePoint} */
  emitMouseDown(e) {
    Window.jgraphChannel.state.mouseLastDownEvent = e;
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.MOUSE_DOWN, {
        mouseEvent: e.evt,
        graphX: e.graphX,
        graphY: e.graphY,
        relativePoint: e.relativePoint,
      });
    }
  },
  /** @param {mxMouseEvent} e contains {evt:MouseEvent, graphX, graphY, RelativePoint} */
  emitMouseUp(e) {
    Window.jgraphChannel.state.mouseLastUpEvent = e;
    if (Window.jgraphChannel.state.mode === Window.jgraphChannel.JMode.REVIEW) {
      if (
        !isAreaLargeEnough(
          Window.jgraphChannel.state.mouseLastDownEvent.relativePoint,
          e.relativePoint
        )
      ) {
        return;
      }
      for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
        subscriberFunc(Window.jgraphChannel.JEvent.CAPTURE_SCREENSHOT, {
          point1: Window.jgraphChannel.state.mouseLastDownEvent.relativePoint,
          point2: e.relativePoint,
        });
      }
    }

    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.MOUSE_UP, {
        mouseEvent: e.evt,
        graphX: e.graphX,
        graphY: e.graphY,
        relativePoint: e.relativePoint,
      });
    }
  },
  /** @param {svgCropData} svg contains {svg: string, cropData: {point1: {x:number, y:number}, point2:{x:number, y:number}}}  */
  emitSvg: (svg) => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.SVG_GENERATED, { svg });
    }
  },
  /** @param {Window.jgraphChannel.JMode} mode */
  emitNewMode: (mode) => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.MODE_CHANGED, { mode });
    }
    Window.jgraphChannel.memoizedEmits[
      Window.jgraphChannel.JEvent.MODE_CHANGED
    ] = mode;
  },
  /** @param {diagramData} args contains {xml:string, name:string, refreshCanvas:boolean} */
  loadDiagram: (args) => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      const xml = args.xml || Window.jgraphEmptyDiagramXml;
      const name = args.name;
      const refreshCanvas = args.refreshCanvas ?? true;
      subscriberFunc(Window.jgraphChannel.JEvent.LOAD_DIAGRAM, {
        xml,
        name,
        refreshCanvas,
      });
    }
  },

  /** @param {diagramData} args contains {name:string|undefined}|undefined */
  emitRenameProposal: (args) => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(
        args?.name
          ? Window.jgraphChannel.JEvent.RENAME_PROPOSAL
          : Window.jgraphChannel.JEvent.RENAME_PROPOSAL_MODAL,
        args?.name ? { name: args.name } : undefined
      );
    }
  },

  /** Emitted by jgraph to request an autosave. */
  emitAutosaveRequest: () => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.AUTOSAVE_REQUEST, {});
    }
  },

  /** Emitted by ng to tell jgraph to proceed with a save -from an autosave request.  */
  emitDoAutosave: () => {
    for (subscriberFunc of Window.jgraphChannel._subscriberFunctions) {
      subscriberFunc(Window.jgraphChannel.JEvent.DO_AUTOSAVE, {});
    }
  },
};

// Subscribe to events from ng.
Window.jgraphChannel.subscribe((event, data) => {
  if (event === Window.jgraphChannel.JEvent.MODE_CHANGED) {
    Window.jgraphChannel.state.mode = data.mode;
  }
});

function isAreaLargeEnough(p1, p2) {
  const minDistancePx = 50;
  const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  return dist >= minDistancePx;
}

function replayMemoizedEmits(callback) {
  const modeChangedEventData =
    Window.jgraphChannel.memoizedEmits[
      Window.jgraphChannel.JEvent.MODE_CHANGED
    ];
  if (modeChangedEventData) callback(modeChangedEventData);
}
