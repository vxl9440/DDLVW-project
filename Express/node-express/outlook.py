import datetime,sys,json
from exchangelib import Account, Credentials, DELEGATE,Configuration


def authenticate():
    # json_file = open('account.json','r')
    # data = json.load(json_file)
    # json_file.close()
    credentials = Credentials(
        username='iSchoolCheckIn@rit.edu',
        password="Iste501SeniorDev"
    )

    config = Configuration(server='mymail.ad.rit.edu', credentials=credentials)

    return Account(
        primary_smtp_address='iSchoolCheckIn@rit.edu',
        credentials=credentials,
        config=config,
        autodiscover=False,
        access_type=DELEGATE
    )


def construct_query_set(a,start_date,end_date):
    start_date_token = start_date.split('-')
    end_date_token = end_date.split('-')
    start = datetime.datetime(int(start_date_token[0]), int(start_date_token[1]), int(start_date_token[2]), tzinfo=a.default_timezone)
    end = datetime.datetime(int(end_date_token[0]), int(end_date_token[1]), int(end_date_token[2]), tzinfo=a.default_timezone)
    return a.calendar.filter(start__range=(start, end))


def output_result(query_set):
    item_list = []
    for item in query_set.order_by('-start'):
        attendee_list = []
        if item.required_attendees is not None:
            for k in item.required_attendees:
                attendee_obj = {
                    "name": k.mailbox.name,
                    "email": k.mailbox.email_address
                }
                attendee_list.append(attendee_obj)
        cal_item_obj = {
            "subject": item.subject,
            "attendees": attendee_list,
            "startTime": item.start.ewsformat().replace('T',' ').replace('Z',''),
            "endTime": item.end.ewsformat().replace('Z','').replace('T',' ')
        }
        item_list.append(cal_item_obj)
    print(item_list)


output_result(construct_query_set(authenticate(),sys.argv[1],sys.argv[2]))