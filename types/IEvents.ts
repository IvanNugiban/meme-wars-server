import IEvent from "./IEvent";

interface IEvents {
    activeEvent: IEvent,
    nextEvent: IEvent,
    pastEvents: IEvent[];
}

export default IEvents;