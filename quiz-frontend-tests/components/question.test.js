/**
 * @jest-environment jsdom
 */
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client"
import { act } from "react-dom/test-utils";

import fetchMock from "jest-fetch-mock";

import Question from "../../quiz-frontend/src/components/question"

fetchMock.enableMocks();

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
let root = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    root = createRoot(container);
    document.body.appendChild(container);
    
    fetch.resetMocks();
});

afterEach(() => {
    // cleanup on exiting
    act( () => {
	root.unmount(container);
    })
    container.remove();
    container = null;
    root = null
});

describe("question component", () => {
    it("renders question fetched from backend", async () => {

	fetch.mockResponseOnce(JSON.stringify({ "question": "1 + 1", "input": '' }));

	await act( async () => {
	    root.render(<Question questionNumber={1} />)
	})
	
	expect(container.querySelector(".question-title").textContent).toBe("Pitanje 2");
	expect(container.querySelector(".question-text").textContent).toBe("1 + 1 ");
	// remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();});
    })
    
    it("does not render if fetching fails", async () => {
	fetch.mockAbort()
	await act( async () => {
	    root.render(<Question questionNumber={1} />)
	})

	expect(container.querySelector(".question")).toBe(null)
    })
})

