//
//  NetworkManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/19/21.
//

import Foundation

final class NetworkManager {
	
	static let errorManager = ErrorManager.shared
	private static let api  = API.address

	// Performs the request with a URL and optional errorIfFail flag
	private static func makeRequest(_ url: URL, errorIfFail: Bool = true) async -> (Data, URLResponse)? {
		do {
			return try await URLSession.shared.data(from: url)
		} catch {
			if !errorIfFail {
				return nil
			}
			
			await handleError(error: error)
			
			return nil
		}
	}
	
	
	// Performs the request using a provided URLRequest
	private static func makeRequest(_ request: URLRequest) async -> (Data, URLResponse)? {
		do {
			return try await URLSession.shared.data(for: request)
		} catch {
			await handleError(error: error)
			
			return nil
		}
	}
	
	
	private static func handleError(error: Error) async {
		print("NETWORK ERROR: \(error)")
		await errorManager.presentAlert(AlertContext.networkAlert)
	}
	
	
	// Attempts to retrieve Advisors from the system that have current walk in hours and are enabled
	static func fetchAvailableAdivsors(errorIfFail: Bool = true) async -> [Advisor] {
		
		guard let url = URL(string: "\(api)/meetingHost/available") else { return [] }
		
		guard let (data, _) = await makeRequest(url, errorIfFail: errorIfFail) else { return [] }
		
		do {
			return try JSONDecoder().decode([Advisor].self, from: data)
		} catch {
			print(error)
			return []
		}
	}
	
	
	// Fetches a student from the system given their UID
	static func fetchStudent(id: String) async -> Student? {
		guard let url = URL(string: "\(api)/student/\(id)") else { return nil }
		
		guard let (data, _) = await makeRequest(url) else { return nil }
		
		do {
			return try JSONDecoder().decode(Student.self, from: data)
		} catch {
			print(error)
			return nil
		}
	}
	
	
	// Attempts to fetch reasons from the system
	static func fetchReasons() async -> [Reason] {
		guard let url = URL(string: "\(api)/reason") else { return [] }
		
		guard let (data, _) = await makeRequest(url) else { return [] }
		
		do {
			return try JSONDecoder().decode([Reason].self, from: data)
		} catch {
			print(error)
			return []
		}
	}
	
	
	// Attempts to check in the student with a given Registration
	static func checkIn(with registration: Registration) async -> Bool {
		guard let url = URL(string: "\(api)/registration/checkin") else { return false }
		
		guard let data = try? JSONEncoder().encode(registration) else { return false }
		
		var request = URLRequest(url: url)
		request.httpMethod = "POST"
		request.setValue("application/json", forHTTPHeaderField: "Content-Type")
		request.httpBody = data
		
		guard let (_, res) = await makeRequest(request) else { return false }
		
		if let res = res as? HTTPURLResponse {
			return res.statusCode == 200
		}
		
		return false
	}
}
