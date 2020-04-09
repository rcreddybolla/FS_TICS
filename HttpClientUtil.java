
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.UsernamePasswordCredentials;
import org.apache.commons.httpclient.auth.AuthScope;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import com.fosiness.dto.common.HttpResponseDto;
import com.fosiness.exception.base.HttpClientException;
import com.google.gson.Gson;

/**
 * 
 * @author RCREDDY
 *
 */
public class HttpClientUtil {

	private  Logger logger = Logger.getLogger(HttpClientUtil.class);
	
	private final static String CONTENT_TYPE = "Content-Type";
	
    private final static String MIME_APP_URLENC = "application/x-www-form-urlencoded";

	private  PoolingHttpClientConnectionManager poolingHttpClientConnectionManager;
	
	@Value("${asana.token}")
	private String asanaToken;
	
	@Value("${asana.host}")
	private String asanaHost;
	
	@Value("${asana.port}")
	private int asanaPort;
	
	/*private  int httpMaxTotalConnections;	
	private  int httpDefaultMaxPerRoute;*/
	
	private int socketTimeoutInMilliSeconds;
	
	private int connectionTimeoutInMilliSeconds;
	
	
	public HttpClientUtil(int httpMaxTotalConnections,
			int httpDefaultMaxPerRoute, int socketTimeoutInMilliSeconds,
			int connectionTimeoutInMilliSeconds) {
		super();		
		
		this.socketTimeoutInMilliSeconds = socketTimeoutInMilliSeconds;
		this.connectionTimeoutInMilliSeconds = connectionTimeoutInMilliSeconds;
		
		this.poolingHttpClientConnectionManager = new PoolingHttpClientConnectionManager();
		this.poolingHttpClientConnectionManager.setDefaultMaxPerRoute(httpDefaultMaxPerRoute);
		this.poolingHttpClientConnectionManager.setMaxTotal(httpMaxTotalConnections);		
	}

	/**
	 * This method returns statusCode,responseString for HttpGet request.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return HttpResponceDto
	 * 
	 */
	public  HttpResponseDto getHttpResponse(String url, Map <String,String> headers,
 Map<String, String> params)
			throws HttpClientException {
		logger.info("Entered the getHttpResponse method.");

		HttpResponseDto httpResponseDto = null;
		HttpGet getRequest = null;
		try {
			getRequest = new HttpGet(url);

			RequestConfig config1 = RequestConfig.custom()
					.setSocketTimeout(socketTimeoutInMilliSeconds)
					.setConnectTimeout(connectionTimeoutInMilliSeconds).build();
			getRequest.setConfig(config1);

			if (headers != null && headers.size() > 0) {
				Iterator<String> iterator = headers.keySet().iterator();
				while (iterator.hasNext()) {
					String key = iterator.next();
					String value = (String) headers.get(key);

					if (logger.isDebugEnabled()) {
						logger.debug("Adding request header: " + key + "="
								+ value);
					}

					getRequest.addHeader(key, value);
				}

			}

			if (params != null && params.size() > 0) {
				Iterator<String> iterator = params.keySet().iterator();
				URI uri = null;
				while (iterator.hasNext()) {
					String key = iterator.next();
					String value = (String) params.get(key);

					if (logger.isDebugEnabled()) {
						logger.debug("Adding request param: " + key + "="
								+ value);
					}

					uri = new URIBuilder(getRequest.getURI()).addParameter(key,
							value).build();
					getRequest.setURI(uri);

				}
			}

			CloseableHttpClient httpClient = HttpClients.custom()
					.setConnectionManager(poolingHttpClientConnectionManager)
					.build();

			CloseableHttpResponse response = httpClient.execute(getRequest);
			int httpStatusCode = response.getStatusLine().getStatusCode();
			String subStatus = EntityUtils.toString(response.getEntity());
			httpResponseDto = new HttpResponseDto(httpStatusCode, subStatus);

		} catch (IOException ioe) {
			logger.error(
					"exception ocurred while failed or interrupted I/O operations::",
					ioe);
			throw new HttpClientException("Unable to process the request",
					HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (URISyntaxException ue) {
			logger.error(
					"exception ocurred while failed to parse URI syntax::", ue);
			throw new HttpClientException("Unable to process the request",
					HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
			try {
				if (getRequest != null)
					getRequest.releaseConnection();
			} catch (Exception e) {
				logger.error(
						"exception ocurred while releasing http pooled connection",
						e);
			}

		}

		if (httpResponseDto.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR
				.value()) {

			logger.error("Service call failed, service name :: " + url);
			throw new HttpClientException("something went wrong",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		else if (httpResponseDto.getStatusCode() == HttpStatus.BAD_REQUEST
				.value()) {

			logger.error("Service call failed, service name :: " + url);
			throw new HttpClientException("Invalid request",
					HttpStatus.BAD_REQUEST);
		}
		
		else if (httpResponseDto.getStatusCode() == HttpStatus.NOT_FOUND
				.value()) {

			logger.error("Resource not found :: " + url);
			throw new HttpClientException("Unable to process the request",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		logger.info("Exiting the getHttpResponse method.");
		return httpResponseDto;
	}

	

	/**
	 * This method is returns statusCode,responseString for HttpPost request.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @param requestBody
	 * @return HttpResponceDto
	 * @throws HttpClientException 
	 */
	public HttpResponseDto postHttpResponse(String url, Map <String,String> headers,
			Map <String,String>params, Object requestBody) throws HttpClientException {
		logger.info("Entered the postHttpResponse method.");

		HttpResponseDto httpResponseDto = null;
		HttpPost postRequest = null;
		boolean isFormUrlEncoded = false;
		try {
			postRequest = new HttpPost(url);
			
			RequestConfig config1 = RequestConfig.custom().setSocketTimeout(socketTimeoutInMilliSeconds).setConnectTimeout(connectionTimeoutInMilliSeconds).build();
			postRequest.setConfig(config1);

			if (headers != null && headers.size() > 0) {
				Iterator<String> iterator = headers.keySet().iterator();
				while (iterator.hasNext()) {
					String key =  iterator.next();
					String value =  headers.get(key);

					if (logger.isDebugEnabled()) {
						logger.debug("Adding request header: " + key + "="
								+ value);
					}
					if(key.equals(CONTENT_TYPE) && value.equals(MIME_APP_URLENC)){
						isFormUrlEncoded = true;
					}
					postRequest.addHeader(key, value);
				}

			}

			if (params != null && params.size() > 0) {
				List<NameValuePair> parameters = new ArrayList<NameValuePair>();

				Iterator<String> iterator = params.keySet().iterator();
				while (iterator.hasNext()) {
					String key =  iterator.next();
					String value = (String) params.get(key);

					if (logger.isDebugEnabled()) {
						logger.debug("Adding request param: " + key + "="
								+ value);
					}

					parameters.add(new BasicNameValuePair(key, value));
					postRequest.setEntity(new UrlEncodedFormEntity(parameters));

				}
			}

			if (requestBody != null) {
				
				if(isFormUrlEncoded){
					postRequest.setEntity(new UrlEncodedFormEntity(
							(List<? extends NameValuePair>) requestBody));
				}
				else{
					Gson gson = new Gson();
					StringEntity postingString = new StringEntity(
							gson.toJson(requestBody));// convert your pojo to json
					postRequest.setEntity(postingString);
					postRequest.setHeader("Content-type", "application/json");
				}
			}

			CloseableHttpClient httpClient = HttpClients.custom()
					.setConnectionManager(poolingHttpClientConnectionManager)
					.build();

			CloseableHttpResponse response = httpClient.execute(postRequest);
			int httpStatusCode = response.getStatusLine().getStatusCode();
			String subStatus = EntityUtils.toString(response.getEntity());
			httpResponseDto = new HttpResponseDto(httpStatusCode, subStatus);

		} catch (IOException ioe) {
			logger.error(
					"exception ocurred while failed or interrupted I/O operations::",
					ioe);
			throw new HttpClientException("Unable to process the request",
					HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
			try {
				if (postRequest != null)
					postRequest.releaseConnection();
			} catch (Exception e) {
				logger.error(
						"exception ocurred while releasing http pooled connection",
						e);
			}

		}

		if (httpResponseDto.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR
				.value()) {

			logger.error("Service call failed, service name :: " + url);
			throw new HttpClientException("something went wrong",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		else if (httpResponseDto.getStatusCode() == HttpStatus.BAD_REQUEST
				.value()) {

			logger.error("Service call failed, service name :: " + url);
			throw new HttpClientException("Invalid request",
					HttpStatus.BAD_REQUEST);
		}
		
		else if (httpResponseDto.getStatusCode() == HttpStatus.NOT_FOUND
				.value()) {

			logger.error("Resource not found :: " + url);
			throw new HttpClientException("Unable to process the request",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		logger.info("Exiting the postHttpResponse method.");
		return httpResponseDto;
	}
	
	/**
	 * This method is used to post spam data to asana as a task.
	 * 
	 * @param postReportSpamDto
	 * @throws HttpClientException
	 */
	public void reportSpamHttpRequest(String asanaURL,
			org.apache.commons.httpclient.NameValuePair[] data)
			throws HttpClientException {
		logger.info("Entered the reportSpamHttpRequest method.");

		HttpClient client = new HttpClient();

		client.getParams().setAuthenticationPreemptive(true);
		/**
		 * TODO:RCREDDY we don't know realm. so we should find out from asana
		 * people.
		 */
		client.getState().setCredentials(new AuthScope(asanaHost, asanaPort),
				new UsernamePasswordCredentials(asanaToken, ""));
		client.getHttpConnectionManager().getParams()
				.setConnectionTimeout(connectionTimeoutInMilliSeconds);
		client.getHttpConnectionManager().getParams()
				.setSoTimeout(socketTimeoutInMilliSeconds);

		PostMethod method = new PostMethod(asanaURL);
		method.setDoAuthentication(true);
		method.setRequestBody(data);
		int returnCode = 0;

		try {
			returnCode = client.executeMethod(method);
		} catch (Exception e) {
			logger.error("exception ocurred while post asana task::", e);
		} finally {
			try {
				if (method != null)
					method.releaseConnection();
			} catch (Exception e) {
				logger.error(
						"exception ocurred while releasing http pooled connection",
						e);
			}

		}

		if (returnCode != org.apache.commons.httpclient.HttpStatus.SC_CREATED) {
			throw new HttpClientException(
					"Failed to perform operation");
		}

		logger.info("Exiting the reportSpamHttpRequest method.");
	}
	
	/*public static void main(String[] args) {
		Map header = new HashMap();
		header.put(
				"X-AUTH-TOKEN",
				"eyJ1c2VybmFtZSI6InNyaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwNTJkOWM4Mi0wYjNjLTQzMzctYWY3Yi0zY2UxOWZiNDEwZDIiLCJwYXNzd29yZCI6bnVsbH0=.ZB3ElmbePv0wX9iAUIb5txW9g/Kfk44hMxq4ZwLU4CI=");
		header.put("Content-Type", "application/json");
		header.put("Accept", "application/json");

		
		 * ContactDto cn = new ContactDto();
		 * 
		 * cn.setContactId("14ffa7e9-fd53-4527-afca-b054c995b434");
		 * cn.setContactType("seller");
		 * 
		 * HttpResponceDto httpResponceDto = postHttpResponce(
		 * "http://localhost:8080/fosiness-web/services/contacts/addcontact",
		 * header, null, cn);
		 * 
		 * System.out.println(httpResponceDto);
		 

		NotificationDto cn = new NotificationDto();

		cn.setUserid("d9b81afc-bd65-4cac-aa0b-ae9aa1c0e5c7");
		cn.setMessage("abc testing");
		cn.setUrl("url");
		cn.setUrl_type("param");
		cn.setNotification_type("inbox");
		// cn.setCreatedts(new Date());

		HttpResponceDto httpResponceDto = postHttpResponce(
				"http://localhost:8080/fosiness-web/services/notification/createnotification",
				header, null, cn);

		System.out.println(httpResponceDto);

		Map params = new HashMap();

		params.put("contactId", "f2bf1f25-47aa-44fa-939e-7b338d52e750");
		params.put("usertext", "agro");

		HttpResponceDto posthttpResponceDto = getHttpResponce(
				"http://localhost:8080/fosiness-web/services/contacts/getsellercontacts",
				header, params);
		System.out.println(posthttpResponceDto);
	}*/
	

}
