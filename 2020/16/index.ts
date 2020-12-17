import { numBetween, splitByEmptyLine } from "../utils"

interface Range<T = number> {
  low: T;
  high: T;
}

type Ticket = number[];

interface TicketData {
  fieldRanges: Map<string, Range[]>;
  myTicket: Ticket;
  otherTickets: Ticket[];
}

interface CertainField {
  index: number;
  value: number;
  fieldName: string;
}

interface UncertainField extends Omit<CertainField, 'fieldName'> {
  possibleFieldNames: string[];
  fieldName?: string;
}

type ResultTicket = CertainField[];

const parseInput = (inputFile: string): TicketData => {
  const [ruleLines, myTicketLines, otherLines] = splitByEmptyLine(inputFile);

  const fieldRanges = new Map<string, Range[]>();

  ruleLines.forEach((line) => {
    const [category, value] = line.split(': ');

    const ranges = value.split(/\sor\s/).map((rangeData) => {
      const [low, high] = rangeData.split('-');
      return { low: parseInt(low, 10), high: parseInt(high, 10) } as Range;
    });

    fieldRanges.set(category, ranges);
  });

  const myTicket = myTicketLines[1].split(',').map(Number) as Ticket;

  const otherTickets = otherLines.slice(1).map(line => line.split(',').map(Number));

  return { fieldRanges, myTicket, otherTickets };
}

const checkField = (ticketField: number, fieldRanges: Range[][]): boolean => {
  return fieldRanges.some(ranges => ranges.some(range => ticketField <= range.high && range.low <= ticketField));
}

const invalidFields = (ticket: Ticket, rangeMap: Map<string, Range[]>): number[] => {
  const ranges = Array.from(rangeMap.values());
  return ticket.filter(field => !checkField(field, ranges));
}

const findFields = (ticket: Ticket, otherTickets: Ticket[], fieldRanges: Map<string, Range[]>): ResultTicket => {
  const categoryRanges = Array.from(fieldRanges.entries());

  const myFields = ticket.map((value, index) => {
    const otherTicketFields = otherTickets.map(otherTicket => otherTicket[index]);

    const possibleFieldNames = categoryRanges
      .filter(([, ranges]) => otherTicketFields.every((ticketField) => {
        return ranges.some(range => range.high >= ticketField && range.low <= ticketField);
      }))
      .map(possibleField => possibleField[0]);

    return { index, value, possibleFieldNames } as UncertainField;
  });

  const certainFields = new Set<string>();

  while (myFields.some((field) => field.possibleFieldNames.length)) {
    for (const myField of myFields.filter(field => field.possibleFieldNames.length === 1)) {
      myField.fieldName = myField.possibleFieldNames[0];
      certainFields.add(myField.fieldName);
    }

    for (const field of myFields) {
      field.possibleFieldNames = field.possibleFieldNames.filter(possibleName => !certainFields.has(possibleName));
    }
  }

  return myFields as ResultTicket;
}

const { fieldRanges, myTicket, otherTickets } = parseInput(`${__dirname}/input.txt`);
const errorRate = otherTickets.flatMap(ticket => invalidFields(ticket, fieldRanges)).reduce((sum, field) => sum += field, 0);

console.log(`Part One: ${errorRate}`);

const validTickets = otherTickets.filter(ticket => invalidFields(ticket, fieldRanges).length === 0);
const validFields = findFields(myTicket, validTickets, fieldRanges);

const part2 = validFields.filter(field => field.fieldName.startsWith('departure')).reduce((product, field) => product * field.value, 1);
console.log(`Part Two: ${part2}`);
