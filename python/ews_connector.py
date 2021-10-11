import datetime
import sys
from exchangelib import Account, Credentials


# Username for Demo: 'iSchoolCheckIn@rit.edu'
# Password for Demo: 'Iste501SeniorDev'
def outlook_Cal(startDate, endDate, username, pword):
    credentials = Credentials(
        username=username,
        password=pword
    )
    a = Account(
        primary_smtp_address=username,
        credentials=credentials,
        autodiscover=True,
        # access_type=DELEGATE
    )
    startList = startDate.split('-')
    endList = endDate.split('-')

    startYear = int(startList[0])
    startMonth = int(startList[1])
    startDay = int(startList[2])

    endYear = int(endList[0])
    endMonth = int(endList[1])
    endDay = int(endList[2])

    start = datetime.datetime(startYear, startMonth, startDay, tzinfo=a.default_timezone)
    end = datetime.datetime(endYear, endMonth, endDay, tzinfo=a.default_timezone)

    # create a meeting request and send it out
    calendar_items = a.calendar.view(start=start, end=end).order_by('subject', 'categories')

    query_set = a.calendar.filter(start__range=(start, end))
    for item in query_set.order_by('-start'):
        print(item.subject)
        print(item.start)
        print(item.end)
        if item.required_attendees is not None:
            for k in item.required_attendees:
                print(k.mailbox.name)
        else:
            print('None')

        print()


start = sys.argv[1]
end = sys.argv[2]
email = sys.argv[3]
password = sys.argv[4]

outlook_Cal(start, end, email, password)
