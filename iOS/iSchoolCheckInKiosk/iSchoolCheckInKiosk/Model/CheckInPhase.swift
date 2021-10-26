//
//  CheckInPhase.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import Foundation

enum CheckInPhase: Equatable {
	
	case identification
	case reasons
    case advisors
	case done(Resolution)
	
	enum Resolution {
		case confirmed, denied
	}

}
